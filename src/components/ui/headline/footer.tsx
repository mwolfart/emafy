import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  subtitle?: string
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

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
    color: ${theme.palette.colorGray600};
    text-transform: uppercase;
    white-space: nowrap;
  `}
`

export const FooterHeadline: FC<Props> = ({ title, subtitle }) => (
  <Wrapper>
    <Title>{title}</Title>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
  </Wrapper>
)
