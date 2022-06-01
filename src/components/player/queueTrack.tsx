import { FC } from 'react'
import styled from 'styled-components'
import { abbreviateText, nameListToString } from 'utils/utils'

type Props = {
  title: string
  artists: string[]
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    color: ${theme.palette.colorTextParagraph};
    font-family: ${theme.fontStyle};
    padding: ${theme.divSpacingSmall} 0;

    p:first-child {
      color: ${theme.palette.colorTextTitle};
    }

    p {
      margin: 0;
    }
  `}
`

export const QueueTrack: FC<Props> = ({ title, artists }) => {
  const trackName = abbreviateText(title, 50)
  const currentTrackArtists = abbreviateText(nameListToString(artists), 50)
  return (
    <Wrapper>
      <p>{trackName}</p>
      <p>{currentTrackArtists}</p>
    </Wrapper>
  )
}
