import styled from 'styled-components'

interface RectangleProps {
  softerShadow?: boolean
}

export const Rectangle = styled.div<RectangleProps>`
  ${({ softerShadow, theme }) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette.colorBackground};
    border-radius: ${theme.borderRadiusDefault};
    border-width: 0;
    box-shadow: ${theme.shadowDimensionsDefault} ${
    softerShadow ? '#ddd' : '#999'
  };
    padding: ${theme.divSpacingBig};
  `}
`
