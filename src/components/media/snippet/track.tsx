import { ContainerFlexCol, ContainerFlexRow } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'
import { Song } from 'types/media'
import {
  formatTrackNumber,
  formatDuration,
  artistListToString,
  abbreviateText,
} from 'utils/utils'

interface Props {
  track: Song
  isPlaylistVariant?: boolean
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
  `}
`

const TitleWrapper = styled(ContainerFlexCol)`
  ${({ theme }) => `
    flex-grow: 1;
    justify-content: center;
    span {
      padding: 0 ${theme.divSpacingSmall};
      color: ${theme.palette.colorTextDisabled};
      &:first-child {
        color: ${theme.palette.colorTextTitle};
      }
    }
  `}
`

export const SnippetTrack: FC<Props> = ({ track, isPlaylistVariant }) => {
  const artists = abbreviateText(artistListToString(track.artists), 35)
  const trackName = abbreviateText(track.name, 35)
  return (
    <TrackWrapper>
      {!isPlaylistVariant && <p>{formatTrackNumber(track.trackNumber)}</p>}
      <TitleWrapper>
        <span>{trackName}</span>
        {isPlaylistVariant && <span>{artists}</span>}
      </TitleWrapper>
      <p>{formatDuration(track.duration)}</p>
    </TrackWrapper>
  )
}
