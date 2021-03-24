import { GlobalProps as StyledProps } from 'types/global'
import styled from 'styled-components'
import { mainStyles } from 'styles'

const Heading = styled.div<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
    font-family: ${theme.fontStyle};
    margin: 0;
  `}
`

export const TitleExtraLarge = styled(Heading).attrs({ as: 'h1' })`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextTitle};
    font-size: ${theme.fontSizeGiant};
  `}
`

export const TitleLarge = styled(Heading).attrs({ as: 'h1' })`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextTitle};
    font-size: ${theme.fontSizeTitle};
  `}
`

export const SubtitleExtraLarge = styled(Heading).attrs({ as: 'h2' })`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextParagraph};
    font-size: ${theme.fontSizeTitle};
  `}
`

export const SubtitleLarge = styled(Heading).attrs({ as: 'h2' })`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextParagraph};
    font-size: ${theme.fontSizeParagraph};
  `}
`

export const TitleNormal = styled(Heading).attrs({ as: 'h3' })`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme?.palette.colorTextTitle};
    width: 100%;
    padding-left: ${theme.divSpacingSmall};
    padding-bottom: ${theme.divSpacingSmall};
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
  `}
`

export const SubtitleNormal = styled(Heading).attrs({ as: 'h4' })`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme?.palette.colorTextDisabled};
    width: 100%;
    padding-left: ${theme.divSpacingSmall};
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTiny};
  `}
`
