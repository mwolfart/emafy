import { MediaLink } from 'components/mediaLink/mediaLink'
import { GlobalProps } from 'types/globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'

type Props = {
  mediaList: Media[]
  rowVariant?: boolean
}

type StyledProps = {
  rowVariant?: boolean
} & GlobalProps

const Wrapper = styled.div<StyledProps>`
  ${({ rowVariant, theme }: StyledProps) => `
    display: grid;
    grid-template-columns: ${
      rowVariant ? '1fr' : 'repeat(auto-fill, minmax(max(240px, 100%/10), 1fr))'
    };
  `}
`

export const MediaMenu: VFC<Props> = ({
  mediaList,
  rowVariant: isRowVariant,
}) => (
  <Wrapper rowVariant={isRowVariant}>
    {mediaList.map((media: Media) => (
      <MediaLink key={media.id} mediaInfo={media} rowVariant={isRowVariant} />
    ))}
  </Wrapper>
)
