import { GlobalProps } from 'types/global'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { Description as MediaDescription } from '../description/description'
import { Image as MediaImage } from '../image/image'
import { strings } from 'strings'

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
  const faSize = isRowVariant ? 'fa-3x' : 'fa-6x'
  const placeholder = (
    <i
      className={`fas ${faSize} fa-record-vinyl`}
      aria-label={strings.components.mediaImage.noImage}
    />
  )

  return (
    <Wrapper href="" rowVariant={isRowVariant}>
      <MediaImage src={imgSrc} small={isRowVariant} placeholder={placeholder} />
      <MediaDescription mediaInfo={mediaInfo} />
    </Wrapper>
  )
}
