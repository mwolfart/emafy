import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  subtitle?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    display: none;
  }
`

const Title = styled.span`
  ${({ theme }) => `
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    font-weight: ${theme.fontBoldTwo};
    line-height: ${theme.lineHeightSimple};
    color: ${theme.palette.colorTextTitle};
    white-space: nowrap;
  `}
`

const Subtitle = styled.span`
  ${({ theme }) => `
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeTiny};
    font-weight: ${theme.fontBoldOne};
    color: ${theme.palette.colorTextDisabled};
    text-transform: uppercase;
    white-space: nowrap;
  `}
`

export const FooterHeadline: VFC<Props> = ({ title, subtitle }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
)
