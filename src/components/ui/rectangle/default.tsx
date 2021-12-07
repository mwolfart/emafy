import styled from 'styled-components'
import { GlobalProps } from 'types/global'

export const Rectangle = styled.div<GlobalProps>`
  ${({ theme }: GlobalProps) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorBackground};
    border-radius: ${theme?.borderRadiusDefault};
    border-width: 0;
    box-shadow: ${theme?.shadowDimensionsLarge};
    padding: ${theme?.divSpacingBig};
  `}
`
