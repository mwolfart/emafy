import { GlobalProps } from 'types/globalProps'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'

type Props = {
  src?: string
  iconSize: string
  iconClass: string
  allowShadow?: boolean
} & GlobalProps

type StyledProps = {
  size: string
  allowShadow?: boolean
} & GlobalProps

export const Wrapper = styled.div<StyledProps>`
  ${({ size, allowShadow, theme }: StyledProps) => `
    width: ${size};
    height: ${size};
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorImageBackground};
    border-radius: ${theme?.borderRadiusDefault};
    justify-content: center;
    text-align: center;
    color: ${theme?.palette.colorTextParagraph};
    ${
      allowShadow
        ? `
    box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowDefault};
    `
        : ''
    }

    &:hover {
      ${
        allowShadow
          ? `
      box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowAccent};
      `
          : ''
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: ${theme?.borderRadiusDefault};
      overflow: hidden;
      object-fit: cover;
    }
  `}
`

export const MediaImage: VFC<Props> = ({
  src,
  iconSize,
  iconClass,
  allowShadow,
}) => (
  <Wrapper size={iconSize} allowShadow={allowShadow}>
    {src ? (
      <img src={src} alt={strings.components.mediaImage.image} />
    ) : (
      <i
        className={iconClass}
        aria-label={strings.components.mediaImage.noImage}
      />
    )}
  </Wrapper>
)
