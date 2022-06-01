import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { PlaybackTrack } from 'types/playbackSDK'
import { QueueTrack } from './queueTrack'

type Props = {
  currentTrack: PlaybackTrack
  tracks: PlaybackTrack[]
}

const Wrapper = styled.div`
  ${({ theme }) => `
    position: absolute;
    bottom: ${theme.divDistanceMedium};
    left: ${theme.divSpacingBig};
    box-shadow: ${theme?.shadowDimensionsTiny};
    padding: ${theme?.divSpacingMedium} ${theme.divSpacingBig};
    background-color: ${theme.palette.colorWhite};
    border-radius: ${theme.divSpacingBig};
    min-width: ${theme.playerQueueWidth};

    span {
        font-weight: ${theme.fontBoldThree};
        padding: ${theme.divSpacingMedium} 0;
    }
  `}
`

export const PlayerQueue: FC<Props> = ({ currentTrack, tracks }) => {
  const queue = tracks.map((track) => (
    <QueueTrack title={track.name} artists={track.artists} />
  ))
  const renderedQueue = tracks.length ? queue : ''
  return (
    <Wrapper>
      <span>{strings.components.player.nowPlaying}</span>
      <QueueTrack title={currentTrack.name} artists={currentTrack.artists} />
      <span>{strings.components.player.nextInQueue}</span>
      {renderedQueue}
    </Wrapper>
  )
}
