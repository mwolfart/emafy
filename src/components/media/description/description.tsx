import { Title, Subtitle } from 'components/ui/index'
import { GlobalProps } from 'types/globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { isAlbum, isArtist, isSong, Media } from 'types/media'

type Props = {
  mediaInfo: Media
} & GlobalProps

const Wrapper = styled.div<GlobalProps>`
  ${({ theme }: GlobalProps) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
  `}
`

export const Description: VFC<Props> = ({ mediaInfo }) => {
  const renderSubTitle = (): string => {
    if (isAlbum(mediaInfo) || isSong(mediaInfo)) {
      return mediaInfo.artists
        .map((artist: Media) => artist.name)
        .reduce((accum: string, name: string) => `${accum}, ${name}`)
    }
    if (isArtist(mediaInfo)) {
      return mediaInfo.genres.reduce(
        (accum: string, genre: string) => `${accum}, ${genre}`,
      )
    }
    return ''
  }

  return (
    <Wrapper>
      <Title>{mediaInfo.name}</Title>
      <Subtitle>{renderSubTitle()}</Subtitle>
    </Wrapper>
  )
}
