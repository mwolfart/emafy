import { GlobalProps } from 'types/globalProps'
import styled from 'styled-components'

export const SubTitle = styled.h4<GlobalProps>`
  ${({ theme }: GlobalProps) => `
    color: ${theme?.palette.colorTextDisabled};
    width: 100%;
    padding-left: 10px;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTiny};
    margin: 0;
  `}
`
