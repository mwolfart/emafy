import styled from 'styled-components'

export const Rectangle = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorBackground};
    border-radius: ${theme?.borderRadiusDefault};
    border-width: 0;
    box-shadow: ${theme?.shadowDimensionsLarge};
    padding: ${theme?.divSpacingBig};
  `}
`
