import { GlobalProps } from 'types/props'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'

type Props = {
  src?: string
  small?: boolean
  placeholder?: JSX.Element
} & GlobalProps

type StyledProps = {
  small?: boolean
} & GlobalProps

export const Wrapper = styled.div<StyledProps>`
  ${({ small, theme }: StyledProps) => `
    width: ${small ? '100px' : '200px'};
    height: ${small ? '100px' : '200px'};
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorImageBackground};
    border-radius: ${theme?.borderRadiusDefault};
    justify-content: center;
    text-align: center;
    color: ${theme?.palette.colorTextParagraph};
    ${
      small &&
      `box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowDefault};`
    }

    &:hover {
      ${
        small &&
        `box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowAccent};`
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

export const Image: VFC<Props> = ({ src, small, placeholder }) => (
  <Wrapper small={small}>
    {src || !placeholder ? (
      <img src={src} alt={strings.components.mediaImage.image} />
    ) : (
      placeholder
    )}
  </Wrapper>
)
