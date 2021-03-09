import { GlobalProps as StyledProps } from 'types/props'
import styled from 'styled-components'

export const Canvas = styled.div<StyledProps>`
  ${({ theme }: StyledProps) => `
    position: absolute;
    min-height: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    background-color: ${theme?.palette.colorBackgroundDisabled};
    place-items: center;
  `}
`
