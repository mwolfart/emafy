import { GlobalProps } from 'globalProps'
import styled from 'styled-components'

export type StyledProps = {
  large?: boolean
} & GlobalProps

export const ModalRectangle = styled.div<StyledProps>`
  ${({ large, theme }: StyledProps) => ` 
    height: ${large ? '500px' : '250px'};
    width: ${large ? '800px' : '400px'};
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorBackground};
    border-radius: ${theme?.borderRadiusDefault};
    border-width: 0;
    box-shadow: ${theme?.shadowDimensionsLarge};
    padding-top: 32px;
    padding-left: 32px;
    padding-right: 32px;
    padding-bottom: 48px;
    color: ${theme?.palette.colorTextParagraph};
    text-align: center;
    font-family: ${theme?.fontStyle};
    font-weight: ${theme?.fontBoldOne};
    font-size: ${theme?.fontSizeParagraph};
    line-height: 28px;

    p {
      padding-bottom: 12px;
    }

    & .title {
      font-size: ${theme?.fontSizeTitle};
      color: ${theme?.palette.colorTextTitle};
      line-height: 40px;
      font-weight: ${theme?.fontBoldTwo};
    }
  `}
`
