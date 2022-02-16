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

type Props = {}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    background-color: white;
    align-items: center;
    justify-content: center;
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
      }
    }
    setPlaybackSDK(initPlaybackSDK(stateChangeCallback))
  }, [])

  const skipToPrevious = (): void => {
    playbackSDK.previousTrack()
  }
  const skipToNext = (): void => {
    playbackSDK.nextTrack()
  }
  const togglePlay = (): void => {
    setIsPlaying(!isPlaying)
    playbackSDK.togglePlay()
  }
  const increaseVolume = async (): Promise<void> => {
    const currentVolume = await playbackSDK.getVolume()
    const volumeStep = 0.05
    const newVolume = Math.min(currentVolume + volumeStep, 1.0)
    playbackSDK.setVolume(newVolume)
  }

  return isLoading ? (
    <Wrapper>
      <BeatLoader />
    </Wrapper>
  ) : (
    <Wrapper>
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
        onClick={increaseVolume}
        isLarge={false}
      />
    </Wrapper>
  )
}
