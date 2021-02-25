import { MediaLink } from 'components/mediaLink/mediaLink'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'

type Props = {
  mediaList: Media[]
}

const MediaMenuBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(max(240px, 100%/10), 1fr));
`

export const MediaMenu: VFC<Props> = ({ mediaList }) => (
  <MediaMenuBlock>
    {mediaList.map((media: Media) => (
      <MediaLink key={media.id} mediaInfo={media} />
    ))}
  </MediaMenuBlock>
)
