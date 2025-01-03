import { Avatar } from 'components/ui'
import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { SimpleArtist } from 'types/media'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  artistList: SimpleArtist[]
}

const Wrapper = styled.div`
  ${({ theme }) => `
  display: none;
  border-top: 2px solid ${theme.palette.colorGray100};
  text-align: right;
  font-family: ${theme.fontStyle};
  color: ${theme.palette.colorTextNegative};
  font-weight: ${theme.fontBoldTwo};
  float: right;
  width: 50%;
  padding: ${theme.divSpacingSmall} 0;

  @media (min-width: 970px) {
    display: block;
  }
`}
`

const ArtistsList = styled.div`
  ${({ theme }) => `
  padding-top: ${theme.divSpacingMedium};
  margin-right: -${theme.divSpacingMedium};
`}
`

export const RelatedArtists: FC<Props> = ({ artistList }) => {
  const shownArtists = artistList.slice(0, 5)
  return (
    <Wrapper>
      {strings.ui.relatedArtists.toUpperCase()}
      <ArtistsList>
        {shownArtists.map((artist) => {
          const imageSrc =
            artist.images && artist.images.length ? artist.images[0] : ''
          const artistLink = `/artist/${artist.id}`
          return (
            <RouterLink to={artistLink} key={artist.id}>
              <Avatar imagePath={imageSrc} small={true} />
            </RouterLink>
          )
        })}
      </ArtistsList>
    </Wrapper>
  )
}
