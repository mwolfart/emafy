import { MediaSquareLink } from 'components/mediaSquareLink/mediaSquareLink'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'

type Props = {
  mediaList: Media[]
}

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(240px, 100%/10), 1fr));
`

export const MediaGridMenu: VFC<Props> = ({ mediaList }) => (
  <MediaGrid>
    {mediaList.map((media: Media) => (
      <MediaSquareLink key={media.id} mediaInfo={media} />
    ))}
  </MediaGrid>
)
