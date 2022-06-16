import { ContainerFlexRow } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'
import { Song } from 'types/media'
import { formatTrackNumber, formatDuration } from 'utils/utils'

interface Props {
  track: Song
}

const TrackWrapper = styled(ContainerFlexRow)`
  ${({ theme }) => `
    align-items: center;

    p {
      color: ${theme.palette.colorTextDisabled};

      @media (max-width: 576px) {
        &:last-child {
          display: none;
        }
      }
    }

    span {
      flex-grow: 1;
      justify-content: center;
      padding: 0 ${theme.divSpacingSmall};
    }
  `}
`

export const SnippetTrack: FC<Props> = ({ track }) => (
  <TrackWrapper key={track.id}>
    <p>{formatTrackNumber(track.trackNumber)}</p>
    <span>{track.name}</span>
    <p>{formatDuration(track.duration)}</p>
  </TrackWrapper>
)
