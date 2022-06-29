import styled from 'styled-components'

export const Canvas = styled.div`
  ${({ theme }) => `
    position: absolute;
    min-height: 100%;
    height: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    background-color: ${theme.palette.colorGray100};
    place-items: center;
  `}
`
