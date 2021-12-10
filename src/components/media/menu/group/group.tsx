import { Link as MediaLink } from 'components/media/menu/link/link'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'

type Props = {
  mediaList: Media[]
  rowVariant?: boolean
}

interface IProps {
  rowVariant?: boolean
}

const Wrapper = styled.div<IProps>`
  ${({ rowVariant, theme }) => `
    display: grid;
    grid-template-columns: ${
      rowVariant ? '1fr' : 'repeat(auto-fill, minmax(max(240px, 100%/10), 1fr))'
    };
  `}
`

export const Group: VFC<Props> = ({ mediaList, rowVariant: isRowVariant }) => (
  <Wrapper rowVariant={isRowVariant}>
    {mediaList.map((media: Media) => (
      <MediaLink key={media.id} mediaInfo={media} rowVariant={isRowVariant} />
    ))}
  </Wrapper>
)
