import { VFC } from 'react'
import styled from 'styled-components'
import { ArtistReference } from 'types/playbackSDK'
import { abbreviateText, nameListToString } from 'utils/utils'

type Props = {
  title: string
  artists: ArtistReference[]
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

export const QueueTrack: VFC<Props> = ({ title, artists }) => {
  const trackName = abbreviateText(title, 50)
  const artistNameList = artists.map((artist) => artist.name)
  const currentTrackArtists = abbreviateText(
    nameListToString(artistNameList),
    50,
  )
  return (
    <Wrapper>
      <p>{trackName}</p>
      <p>{currentTrackArtists}</p>
    </Wrapper>
  )
}
