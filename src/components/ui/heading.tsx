import { GlobalProps as StyledProps } from 'types/global'
import styled from 'styled-components'
import { mainStyles } from 'styles'

export const TitleBig = styled.h1<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextTitle};
    font-size: ${theme.fontSizeTitle};
    margin: 0;
  `}
`

export const SubtitleBig = styled.h2<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextParagraph};
    font-size: ${theme.fontSizeParagraph};
    margin: 0;
  `}
`

export const TitleNormal = styled.h3<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
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

export const SubtitleNormal = styled.h4<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme?.palette.colorTextDisabled};
    width: 100%;
    padding-left: 10px;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTiny};
    margin: 0;
  `}
`
