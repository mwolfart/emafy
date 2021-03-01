import { GlobalProps } from 'globalProps'
import styled from 'styled-components'

export type Props = {
  size: string
} & GlobalProps

export const MediaIcon = styled.i<Props>`
  ${({ size, theme }: Props) => `
    width: ${size};
    height: ${size};
    background-color: ${theme?.palette.colorImageBackground};
    border-radius: ${theme?.borderRadiusDefault};
    text-align: center;
    line-height: ${size};
    color: ${theme?.palette.colorTextParagraph};
  `}
`
