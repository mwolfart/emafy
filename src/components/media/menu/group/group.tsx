import { Item as MediaMenuItem } from 'components/media/menu/item/item'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { MediaExtraProps } from 'types/mediaExtraProps'

type Props = {
  mediaList: Media[]
  rowVariant?: boolean
  extraProps?: MediaExtraProps
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

export const Group: VFC<Props> = ({
  mediaList,
  rowVariant: isRowVariant,
  extraProps,
}) => (
  <Wrapper rowVariant={isRowVariant}>
    {mediaList.map((media: Media) => (
      <MediaMenuItem
        key={media.id}
        mediaInfo={media}
        rowVariant={isRowVariant}
        extraProps={extraProps}
      />
    ))}
  </Wrapper>
)
