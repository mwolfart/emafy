import { playMedia } from 'api/data/playback'
import { BeatLoader } from 'components/loader'
import { FooterHeadline } from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { useContext, useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { Nullable } from 'types/global'
import { WebPlaybackState, WebPlaybackTrack } from 'types/playbackSDK'
import { emptyPlackbackSDK } from 'utils/constants'
import { initPlaybackSDK } from 'utils/initPlaybackSDK'
import { abbreviateText, nameListToString } from 'utils/utils'
import { PlayerButton } from './playerButton'
import { PlayerUpcomingTracksSnippet } from './playerUpcomingTracksSnippet'
import { PlayerVolumeSnippet } from './playerVolumeSnippet'

type Props = {}

type StyledProps = {
  trackProgress: number
}

const Wrapper = styled.div<StyledProps>`
  ${({ trackProgress, theme }) => `
    display: flex;
    flex-direction: row;
    background-color: white;
    align-items: center;
    justify-content: center;

    &:after {
      transition: width 0.5s;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: ${trackProgress * 100}%;
      height: 3px;
      background: linear-gradient(50deg, 
        ${theme.palette.colorPrimary} 60%, 
        ${theme.palette.colorSecondary} 100%), 
        ${theme.palette.colorTrackProgress};
    } 
  `}
`

const MusicControlWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const TrackInfoContainer = styled.div`
  position: absolute;
  left: 80px;
`

export const PlayerComponent: VFC<Props> = () => {
  const [playbackSDK, setPlaybackSDK] = useState(emptyPlackbackSDK)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTrack, setCurrentTrack] =
    useState<Nullable<WebPlaybackTrack>>(null)
  const [trackProgress, setTrackProgress] = useState(0)
  const [trackDuration, setTrackDuration] = useState(0)
  const [showVolumeControls, setShowVolumeControls] = useState(false)
  const [upcomingTracks, setUpcomingTracks] = useState<WebPlaybackTrack[]>([])
  const [showUpcomingTracks, setShowUpcomingTracks] = useState(false)

  useEffect(() => {
    const stateChangeCallback = (state: Nullable<WebPlaybackState>): void => {
      if (state != null) {
        setIsLoading(false)
        setIsPlaying(!state.paused)
        setCurrentTrack(state.track_window.current_track)
        setTrackDuration(state.duration)
        setTrackProgress(state.position)
        setUpcomingTracks(state.track_window.next_tracks)
      }
    }
    setPlaybackSDK(initPlaybackSDK(stateChangeCallback))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setTrackProgress(trackProgress + 1000)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [trackProgress, isPlaying])

  const skipToPrevious = (): void => {
    if (trackProgress < 2000) {
      playbackSDK.previousTrack()
    } else {
      playbackSDK.seek(0)
    }
  }
  const skipToNext = (): void => {
    playbackSDK.nextTrack()
  }
  const togglePlay = (): void => {
    setIsPlaying(!isPlaying)
    playbackSDK.togglePlay()
  }
  const setVolume = (value: number): void => {
    playbackSDK.setVolume(value)
  }

  const playerContext = useContext(PlayerContext)
  useEffect(() => {
    playerContext.playSong = (songId: string) => {
      if (playbackSDK.deviceId) {
        const uri = `spotify:track:${songId}`
        setIsPlaying(true)
        playMedia(playbackSDK.deviceId, uri)
      }
    }
  }, [playerContext, playbackSDK])

  const displayedTrackName = currentTrack
    ? abbreviateText(currentTrack.name, 50)
    : ''
  const artistNames = currentTrack
    ? currentTrack.artists.map((artist) => artist.name)
    : []
  const displayedArtist = abbreviateText(nameListToString(artistNames), 50)

  return isLoading ? (
    <Wrapper trackProgress={0}>
      <BeatLoader />
    </Wrapper>
  ) : (
    <Wrapper trackProgress={trackProgress / trackDuration}>
      <PlayerButton
        iconClass="fa-list"
        onClick={() => setShowUpcomingTracks(!showUpcomingTracks)}
        isLarge={false}
        disabled={currentTrack === null}
      />
      {showUpcomingTracks && currentTrack && (
        <PlayerUpcomingTracksSnippet
          currentTrack={currentTrack}
          tracks={upcomingTracks}
        />
      )}
      <TrackInfoContainer>
        <FooterHeadline title={displayedTrackName} subtitle={displayedArtist} />
      </TrackInfoContainer>
      <MusicControlWrapper>
        <PlayerButton
          iconClass="fa-step-backward"
          onClick={skipToPrevious}
          isLarge={false}
        />
        <PlayerButton
          iconClass={isPlaying ? 'fa-pause' : 'fa-play'}
          onClick={togglePlay}
          isLarge={true}
        />
        <PlayerButton
          iconClass="fa-step-forward"
          onClick={skipToNext}
          isLarge={false}
        />
      </MusicControlWrapper>
      <PlayerButton
        iconClass="fa-volume-up"
        onClick={() => setShowVolumeControls(!showVolumeControls)}
        isLarge={false}
      />
      {showVolumeControls && <PlayerVolumeSnippet setVolume={setVolume} />}
    </Wrapper>
  )
}
