import { BeatLoader } from 'components/loader'
import { FooterHeadline } from 'components/ui'
import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { Nullable } from 'types/global'
import { WebPlaybackState } from 'types/playbackSDK'
import { emptyPlackbackSDK } from 'utils/constants'
import { initPlaybackSDK } from 'utils/initPlaybackSDK'
import { nameListToString } from 'utils/utils'
import { PlayerButton } from './playerButton'
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
  const [currentTrack, setCurrentTrack] = useState('')
  const [currentArtist, setCurrentArtist] = useState('')
  const [trackProgress, setTrackProgress] = useState(0)
  const [trackDuration, setTrackDuration] = useState(0)
  const [showVolumeControls, setShowVolumeControls] = useState(false)

  useEffect(() => {
    const stateChangeCallback = (state: Nullable<WebPlaybackState>): void => {
      if (state != null) {
        setIsLoading(false)
        setIsPlaying(!state.paused)
        setCurrentTrack(state.track_window.current_track.name)
        const artistNames = state.track_window.current_track.artists.map(
          (artist) => artist.name,
        )
        setCurrentArtist(nameListToString(artistNames))
        setTrackDuration(state.duration)
        setTrackProgress(state.position)
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

  return isLoading ? (
    <Wrapper trackProgress={0}>
      <BeatLoader />
    </Wrapper>
  ) : (
    <Wrapper trackProgress={trackProgress / trackDuration}>
      <PlayerButton iconClass="fa-list" onClick={() => {}} isLarge={false} />
      <TrackInfoContainer>
        <FooterHeadline title={currentTrack} subtitle={currentArtist} />
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
      <PlayerVolumeSnippet shown={showVolumeControls} setVolume={setVolume} />
    </Wrapper>
  )
}
