import { MediaLink } from 'components/mediaLink/mediaLink'
import { GlobalProps } from 'globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'

type Props = {
  mediaList: Media[]
  rowVariant?: boolean
}

type MenuBlockProps = {
  rowVariant?: boolean
} & GlobalProps

const MediaMenuBlock = styled.div<MenuBlockProps>`
  display: grid;
  grid-template-columns: ${(props: MenuBlockProps) =>
    props.rowVariant
      ? '1fr'
      : 'repeat(auto-fill, minmax(max(240px, 100%/10), 1fr))'};
`

export const MediaMenu: VFC<Props> = ({
  mediaList,
  rowVariant: isRowVariant,
}) => (
  <MediaMenuBlock rowVariant={isRowVariant}>
    {mediaList.map((media: Media) => (
      <MediaLink key={media.id} mediaInfo={media} rowVariant={isRowVariant} />
    ))}
  </MediaMenuBlock>
)
