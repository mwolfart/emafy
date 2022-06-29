import { FC } from 'react'
import styled from 'styled-components'

import { ContainerFlexCol } from '../container/container'

interface Props {
  title: string
  subtitle?: string
  smaller?: boolean
}

interface StyledProps {
  smaller?: boolean
}

const Wrapper = styled(ContainerFlexCol)<StyledProps>`
  ${({ smaller, theme }) => `
    flex-grow: 1;
    margin: ${smaller ? theme.divSpacingSmall : theme.divSpacingMedium} 0;
  `}
`

const Title = styled.span<StyledProps>`
  ${({ smaller, theme }) => `
    color: ${theme.palette.colorTextTitle};
    font-weight: ${theme.fontBoldTwo};
    font-size: ${smaller ? theme.fontSizeParagraph : theme.fontSizeTitle};
    text-align: left;
    line-height: 1.5;
    @media (max-width: 576px) {
      font-size: ${
        smaller ? theme.fontSizeParagraph : theme.fontSizeTitleResponsive
      };
    }
    @media (max-width: 450px) {
      font-size: ${
        smaller ? theme.fontSizeParagraphResponsive : theme.fontSizeParagraph
      };
    }
  `}
`

const Subtitle = styled.span`
  ${({ theme }) => `
    color: ${theme.palette.colorGray600};
    font-weight: ${theme.fontBoldTwo};
    font-size: ${theme.fontSizeParagraph};
    text-align: left;
    line-height: 1.5;
    @media (max-width: 576px) {
      font-size: ${theme.fontSizeParagraphResponsive};
    }
  `}
`

export const Headline: FC<Props> = ({ title, subtitle, smaller }) => (
  <Wrapper smaller={smaller}>
    <Title smaller={smaller}>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
)
