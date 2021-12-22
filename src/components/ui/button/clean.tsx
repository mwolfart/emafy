import styled from 'styled-components'

export const CleanButton = styled.button`
  ${({ theme }) => `
    padding: 0;
    border: 0;
    margin: 0;
    background-color: unset;
    color: unset;
    text-align: unset;
    display: flex;
    cursor: pointer;
    font-family: ${theme.fontStyle};
    font-size: inherit;
  `}
`
