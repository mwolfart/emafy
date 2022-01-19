import styled from 'styled-components'

type StyledProps = {
  large?: boolean
}

export const ModalRectangle = styled.div<StyledProps>`
  ${({ large, theme }) => ` 
    height: ${large ? '500px' : '250px'};
    width: ${large ? '800px' : '400px'};
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorBackground};
    border-radius: ${theme?.borderRadiusDefault};
    border-width: 0;
    box-shadow: ${theme?.shadowDimensionsLarge};
    padding-top: ${theme?.divSpacingBig};
    padding-left: ${theme?.divSpacingBig};
    padding-right: ${theme?.divSpacingBig};
    padding-bottom: ${theme?.divSpacingExtraBig};
    color: ${theme?.palette.colorTextParagraph};
    text-align: center;
    font-family: ${theme?.fontStyle};
    font-weight: ${theme?.fontBoldOne};
    font-size: ${theme?.fontSizeParagraph};
    line-height: ${theme?.lineHeightSimple};

    p {
      padding-bottom: ${theme?.divSpacingSmall};
    }

    & .title {
      font-size: ${theme?.fontSizeTitle};
      color: ${theme?.palette.colorTextTitle};
      font-weight: ${theme?.fontBoldTwo};
    }

    @media (max-width: 576px) {
      height: 100%;
      width: 100%;
      padding: 0 ${theme?.divSpacingBig};
      border-radius: 0;
      place-content: center;
    }
  `}
`
