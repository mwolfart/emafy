import styled from 'styled-components'

export const Canvas = styled.div`
  position: absolute;
  min-height: 100%;
  min-width: 100vw;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.colorBackgroundDisabled};
  place-items: center;
`
