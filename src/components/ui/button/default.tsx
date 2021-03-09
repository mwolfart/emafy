import { GlobalProps as StyledProps } from 'types/props'
import styled from 'styled-components'

export const Button = styled.button<StyledProps>`
  ${({ theme }: StyledProps) => `
    background-image: linear-gradient(
      45deg,
      ${theme?.palette.colorPrimary},
      ${theme?.palette.colorButtonIntermed} 66%,
      ${theme?.palette.colorSecondary}
    );
    border-radius: ${theme?.borderRadiusSmall};
    border-width: 0;
    padding: 16px 36px;
    color: ${theme?.palette.colorTextButton};
    text-align: center;
    font-family: ${theme?.fontStyle};
    font-size: ${theme?.fontSizeParagraph};
    font-weight: ${theme?.fontBoldThree};
    letter-spacing: 1.5px;
    width: fit-content;
    align-self: center;
  `}
`
