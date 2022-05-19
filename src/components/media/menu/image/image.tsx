import { FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'

type Props = {
  src?: string
  small?: boolean
  placeholder?: JSX.Element
}

type StyledProps = {
  small?: boolean
}

export const Wrapper = styled.div<StyledProps>`
  ${({ small, theme }) => `
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
      !small &&
      `box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowDefault};`
    }

    &:hover {
      ${
        !small &&
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

    @media (max-width: 576px) {
      align-self: center;
      width: 150px;
      height: 150px;
      ${small && `margin: ${theme.divSpacingSmall} 0;`}
    }
  `}
`

export const MediaImage: FC<Props> = ({ src, small, placeholder }) => (
  <Wrapper small={small}>
    {src || !placeholder ? (
      <img src={src} alt={strings.components.media.image.description} />
    ) : (
      placeholder
    )}
  </Wrapper>
)
