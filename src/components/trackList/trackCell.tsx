import { artistListToString, formatDuration } from 'utils/utils'
import { VFC } from 'react'
import styled from 'styled-components'
import { Song } from 'types/media'

type Props = {
  track: Song
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    border-radius: ${theme.borderRadiusDefault};
    border-size: 0;
    background-color: ${theme.palette.colorLinkBackground};
    padding: ${theme.divSpacingMedium};
    margin: ${theme.divSpacingSmall};
    font-style: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    color: ${theme.palette.colorTextTitle};
    transition: ${theme.transitionQuick};

    &:hover {
      background-color: ${theme.palette.colorLinkBackgroundHover};
      transition: ${theme.transitionQuick};
    }
  `}
`

const TextWithPadding = styled.div`
  ${({ theme }) => `
    padding-right: ${theme.divSpacingSmall};
  `}
`

const TextName = styled.div`
  flex-grow: 1;
`

const TextDuration = styled.div`
  ${({ theme }) => `
    text-align: right;

    &:before {
      content: '-';
      margin: 0 ${theme.divSpacingSmall};
    }
  `}
`

export const TrackCell: VFC<Props> = ({ track }) => (
  <Wrapper>
    <TextWithPadding>{track.trackNumber}</TextWithPadding>
    <TextName>{track.name}</TextName>
    {artistListToString(track.artists)}
    <TextDuration>{formatDuration(track.duration)}</TextDuration>
  </Wrapper>
)
