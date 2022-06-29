import { playMedia } from 'api/data/playback'
import { BeatLoader } from 'components/loader'
import { FooterHeadline } from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { useContext, useEffect, useState, FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { Nullable } from 'types/global'
import {
  PlaybackMediaType,
  PlaybackState,
  PlaybackTrack,
} from 'types/playbackSDK'
import { emptyPlackbackSDK } from 'utils/constants'
import { initPlaybackSDK } from 'api/initPlaybackSDK'
import { abbreviateText, nameListToString } from 'utils/utils'
import { PlayerButton } from './playerButton'
import { PlayerQueue } from './playerQueue'
import { PlayerVolumeControl } from './playerVolumeControl'

interface StyledProps {
  trackProgress: number
}

const Wrapper = styled.div<StyledProps>`
  ${({ trackProgress, theme }) => `
    display: flex;
    flex-direction: row;
    background-color: ${theme.palette.colorWhite};
    align-items: center;
    justify-content: center;
    height: ${theme.playerHeight};

    &:after {
      content: "";
      transition: width ${theme.transitionQuick};
      position: absolute;
      top: 0;
      left: 0;
      width: ${trackProgress * 100}%;
      height: ${theme.progressBarSize};
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
  ${({ theme }) => `
    position: absolute;
    left: ${theme.divDistanceSmall};
  `}
`

export const PlayerComponent: FC = () => {
  const [playbackSDK, setPlaybackSDK] = useState(emptyPlackbackSDK)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTrack, setCurrentTrack] =
    useState<Nullable<PlaybackTrack>>(null)
  const [trackProgress, setTrackProgress] = useState(0)
  const [trackDuration, setTrackDuration] = useState(0)
  const [showVolumeControls, setShowVolumeControls] = useState(false)
  const [queueTracks, setQueueTracks] = useState<PlaybackTrack[]>([])
  const [showQueue, setShowQueue] = useState(false)
  const [volume, setVolume] = useState(0.5)

  useEffect(() => {
    const stateChangeCallback = (state: PlaybackState): void => {
      setIsLoading(false)
      setIsPlaying(!state.paused)
      setCurrentTrack(state.trackWindow.currentTrack)
      setTrackDuration(state.duration)
      setTrackProgress(state.position)
      setQueueTracks(state.trackWindow.nextTracks)
    }
    setPlaybackSDK(initPlaybackSDK(stateChangeCallback))
  }, [])

  useEffect(() => {
    playbackSDK.getVolume().then((volume) => setVolume(volume))
  }, [playbackSDK])

  useEffect(() => {
    const progressBarUpdateFn = (): void => {
      isPlaying && setTrackProgress(trackProgress + 1000)
    }

    const interval = setInterval(progressBarUpdateFn, 1000)
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
  const updateVolume = (newValue: number): void => {
    setVolume(newValue)
    playbackSDK.setVolume(newValue)
  }

  const playerContext = useContext(PlayerContext)
  useEffect(() => {
    const play = (id: string, type: PlaybackMediaType): void => {
      if (playbackSDK.deviceId) {
        const uri = `spotify:${type}:${id}`
        setIsPlaying(true)
        playMedia(playbackSDK.deviceId, uri, type)
      }
    }

    playerContext.playMedia = play
    playerContext.playSong = (id: string) => play(id, 'track')
    playerContext.playAlbum = (id: string) => play(id, 'album')
    playerContext.playArtist = (id: string) => play(id, 'artist')
    playerContext.playPlaylist = (id: string) => play(id, 'playlist')
  }, [playerContext, playbackSDK])

  const displayedTrackName = currentTrack
    ? abbreviateText(currentTrack.name, 50)
    : ''
  const displayedArtist = currentTrack
    ? abbreviateText(nameListToString(currentTrack.artists), 50)
    : ''
  const trackProgressPercent = trackProgress / trackDuration

  return isLoading ? (
    <Wrapper trackProgress={0}>
      <BeatLoader />
    </Wrapper>
  ) : (
    <Wrapper trackProgress={trackProgressPercent}>
      <PlayerButton
        iconClass="fa-list"
        onClick={() => setShowQueue(!showQueue)}
        isLarge={false}
        disabled={currentTrack === null}
        ariaLabel={strings.ui.viewQueue}
      />
      {showQueue && currentTrack && (
        <PlayerQueue currentTrack={currentTrack} tracks={queueTracks} />
      )}
      <TrackInfoContainer>
        <FooterHeadline title={displayedTrackName} subtitle={displayedArtist} />
      </TrackInfoContainer>
      <MusicControlWrapper>
        <PlayerButton
          iconClass="fa-step-backward"
          onClick={skipToPrevious}
          isLarge={false}
          ariaLabel={strings.ui.previous}
        />
        <PlayerButton
          iconClass={isPlaying ? 'fa-pause' : 'fa-play'}
          onClick={togglePlay}
          isLarge={true}
          ariaLabel={isPlaying ? strings.ui.pause : strings.ui.play}
        />
        <PlayerButton
          iconClass="fa-step-forward"
          onClick={skipToNext}
          isLarge={false}
          ariaLabel={strings.ui.next}
        />
      </MusicControlWrapper>
      <PlayerButton
        iconClass="fa-volume-up"
        onClick={() => setShowVolumeControls(!showVolumeControls)}
        isLarge={false}
        ariaLabel={strings.ui.adjustVolume}
      />
      {showVolumeControls && (
        <PlayerVolumeControl setVolume={updateVolume} currentVolume={volume} />
      )}
    </Wrapper>
  )
}
