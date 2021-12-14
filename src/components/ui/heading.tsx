import styled from 'styled-components'

const Heading = styled.div`
  ${({ theme }) => `
    font-family: ${theme.fontStyle};
    margin: 0;
  `}
`

export const TitleExtraLarge = styled(Heading).attrs({ as: 'h1' })`
  ${({ theme }) => `
    color: ${theme.palette.colorTextTitle};
    font-size: ${theme.fontSizeGiant};
  `}
`

export const TitleLarge = styled(Heading).attrs({ as: 'h1' })`
  ${({ theme }) => `
    color: ${theme.palette.colorTextTitle};
    font-size: ${theme.fontSizeTitle};
  `}
`

export const SubtitleExtraLarge = styled(Heading).attrs({ as: 'h2' })`
  ${({ theme }) => `
    color: ${theme.palette.colorTextParagraph};
    font-size: ${theme.fontSizeTitle};
  `}
`

export const SubtitleLarge = styled(Heading).attrs({ as: 'h2' })`
  ${({ theme }) => `
    color: ${theme.palette.colorTextParagraph};
    font-size: ${theme.fontSizeParagraph};
  `}
`

export const TitleNormal = styled(Heading).attrs({ as: 'h3' })`
  ${({ theme }) => `
    color: ${theme?.palette.colorTextTitle};
    width: 100%;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
  `}
`

export const SubtitleNormal = styled(Heading).attrs({ as: 'h4' })`
  ${({ theme }) => `
    color: ${theme?.palette.colorTextDisabled};
    width: 100%;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTiny};
  `}
`
