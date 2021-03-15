import { GlobalProps } from 'types/global'
import styled from 'styled-components'

export const Title = styled.h3<GlobalProps>`
  ${({ theme }: GlobalProps) => `
    color: ${theme?.palette.colorTextTitle};
    width: 100%;
    padding-left: 10px;
    padding-bottom: 10px;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
    margin: 0;
  `}
`
