import { GlobalProps } from 'types/globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { Description as MediaDescription } from '../description/description'
import { Image as MediaImage } from '../image/image'

type Props = {
  mediaInfo: Media
  rowVariant?: boolean
} & GlobalProps

type StyledProps = {
  rowVariant?: boolean
} & GlobalProps

const Wrapper = styled.a<StyledProps>`
  ${({ rowVariant, theme }: StyledProps) => `
    display: flex;
    flex-direction: ${rowVariant ? 'row' : 'column'};
    font-family: ${theme?.fontStyle};
    padding: 12px;
    transition: ${theme?.transitionQuick};
    ${
      rowVariant
        ? `
    margin: 10px; 
    border-radius: ${theme?.borderRadiusDefault};
    background-color: ${theme?.palette.colorLinkBackground};`
        : `
    max-width: 210px;`
    }

    &:hover {
      transition: ${theme?.transitionQuick};
      ${
        rowVariant
          ? `
      background-color: ${theme?.palette.colorLinkBackgroundHover};`
          : `
      transform: scale(1.1);`
      }
    }

    div + div {
      padding-top: ${rowVariant ? '0' : '10px'};
    }
  `}
`

export const Link: VFC<Props> = ({ mediaInfo, rowVariant: isRowVariant }) => {
  const imgSrc = mediaInfo.images?.[0]
  const iconSize = isRowVariant ? '100px' : '200px'
  const faSize = isRowVariant ? 'fa-3x' : 'fa-6x'

  return (
    <Wrapper href="" rowVariant={isRowVariant}>
      <MediaImage
        src={imgSrc}
        iconSize={iconSize}
        iconClass={`fas ${faSize} fa-record-vinyl`}
        allowShadow={!isRowVariant}
      />
      <MediaDescription mediaInfo={mediaInfo} />
    </Wrapper>
  )
}
