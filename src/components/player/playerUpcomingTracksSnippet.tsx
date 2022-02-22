import { VFC } from 'react'
import styled from 'styled-components'
import { WebPlaybackTrack } from 'types/playbackSDK'
import { PlayingTrack } from './playingTrack'

type Props = {
  currentTrack: WebPlaybackTrack
  tracks: WebPlaybackTrack[]
}

const Wrapper = styled.div`
  ${({ theme }) => `
    position: absolute;
    bottom: 100px;
    left: 30px;
    box-shadow: ${theme?.shadowDimensionsTiny};
    padding: ${theme?.divSpacingMedium} ${theme.divSpacingBig};
    background-color: white;
    border-radius: 30px;
    min-width: 300px;

    span {
        font-weight: ${theme.fontBoldThree};
        padding: ${theme.divSpacingMedium} 0;
    }
  `}
`

export const PlayerUpcomingTracksSnippet: VFC<Props> = ({
  currentTrack,
  tracks,
}) => (
  <Wrapper>
    <span>Now playing</span>
    <PlayingTrack title={currentTrack.name} artists={currentTrack.artists} />
    <span>Next</span>
    {tracks.length
      ? tracks.map((track) => (
          <PlayingTrack title={track.name} artists={track.artists} />
        ))
      : ''}
  </Wrapper>
)
