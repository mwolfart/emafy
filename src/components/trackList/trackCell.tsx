import { artistListToString, formatDuration } from 'components/media/utils'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps as StyledProps } from 'types/global'
import { Song } from 'types/media'

type Props = {
  track: Song
}

const Wrapper = styled.div<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    display: flex;
    flex-direction: row;
    border-radius: ${theme.borderRadiusDefault};
    border-size: 0;
    background-color: ${theme.palette.colorLinkBackground};
    padding: 20px;
    margin: 10px;
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

const TextWithPadding = styled.div<StyledProps>`
  padding-right: 10px;
`

const TextName = styled.div<StyledProps>`
  flex-grow: 1;
`

const TextDuration = styled.div<StyledProps>`
  text-align: right;

  &:before {
    content: '-';
    margin: 0 10px;
  }
`

export const TrackCell: VFC<Props> = ({ track }) => (
  <Wrapper>
    <TextWithPadding>{track.trackNumber}</TextWithPadding>
    <TextName>{track.name}</TextName>
    {artistListToString(track.artists)}
    <TextDuration>{formatDuration(track.duration)}</TextDuration>
  </Wrapper>
)