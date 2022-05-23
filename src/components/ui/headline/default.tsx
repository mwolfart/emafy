import { FC } from 'react'
import styled from 'styled-components'

import { ContainerFlexCol } from '../container/container'

type Props = {
  title: string
  subtitle?: string
}

const Wrapper = styled(ContainerFlexCol)`
  ${({ theme }) => `
    flex-grow: 1;
    margin: ${theme.divSpacingMedium} 0;
  `}
`

const Title = styled.span`
  ${({ theme }) => `
    color: ${theme?.palette.colorTextTitle};
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTitle};
    text-align: left;
    line-height: 1.5;
    @media (max-width: 576px) {
      font-size: ${theme?.fontSizeTitleResponsive};
    }
    @media (max-width: 450px) {
      font-size: ${theme?.fontSizeParagraph};
    }
  `}
`

const Subtitle = styled.span`
  ${({ theme }) => `
    color: ${theme?.palette.colorTextDisabled};
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
    text-align: left;
    line-height: 1.5;
    @media (max-width: 576px) {
      font-size: ${theme?.fontSizeParagraphResponsive};
    }
  `}
`

export const Headline: FC<Props> = ({ title, subtitle }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
)
