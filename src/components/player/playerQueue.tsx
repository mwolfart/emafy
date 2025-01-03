import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { PlaybackTrack } from 'types/playbackSDK'
import { QueueTrack } from './queueTrack'

interface Props {
  currentTrack: PlaybackTrack
  tracks: PlaybackTrack[]
}

const Wrapper = styled.div`
  ${({ theme }) => `
    position: absolute;
    bottom: ${theme.divDistanceSmall};
    left: ${theme.divSpacingMedium};
    box-shadow: ${theme.shadowDimensionsTiny};
    padding: ${theme.divSpacingMedium} ${theme.divSpacingBig};
    background-color: ${theme.palette.colorWhite};
    border-radius: ${theme.divSpacingBig};
    width: calc(100vw - ${theme.divSpacingBig} * 4);

    span {
        font-weight: ${theme.fontBoldThree};
        padding: ${theme.divSpacingMedium} 0;
    }

    @media (min-width: 576px) {
      left: ${theme.divSpacingBig};
      bottom: ${theme.divDistanceMedium};
      width: ${theme.playerQueueWidth};
    }
  `}
`

export const PlayerQueue: FC<Props> = ({ currentTrack, tracks }) => {
  const queue = tracks.map((track) => (
    <QueueTrack key={track.id} title={track.name} artists={track.artists} />
  ))
  const renderedQueue = tracks.length ? queue : ''
  return (
    <Wrapper>
      <span>{strings.ui.nowPlaying}</span>
      <QueueTrack title={currentTrack.name} artists={currentTrack.artists} />
      <span>{strings.ui.nextInQueue}</span>
      {renderedQueue}
    </Wrapper>
  )
}
