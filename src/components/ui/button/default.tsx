import styled from 'styled-components'

interface StyledProps {
  square?: boolean
}

export const Button = styled.button<StyledProps>`
  ${({ square, theme }) => `
    background-image: ${theme.palette.gradientButton};
    border-radius: ${theme.borderRadiusSmall};
    border-width: 0;
    display: flex;
    flex-direction: row;
    padding: 16px ${square ? '16px' : '36px'};
    color: ${theme.palette.colorTextButton};
    text-align: center;
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    font-weight: ${theme.fontBoldThree};
    letter-spacing: 1.5px;
    width: fit-content;
    align-self: center;
    align-items: center;
    cursor: pointer;
    white-space: nowrap;
    @media (max-width: 460px) {
      padding: 12px 16px;
      font-size: ${theme.fontSizeParagraphResponsive};
    }
  `}
`
