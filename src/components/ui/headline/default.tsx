import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { ContainerFlexCol } from '../container'

type Props = {
  title: string
  subtitle?: string
}

const Wrapper = styled(ContainerFlexCol)`
  ${({ theme = mainStyles }: GlobalProps) => `
    flex-grow: 1;
    margin: ${theme.divSpacingMedium} 0;
  `}
`

const Title = styled.span`
  ${({ theme = mainStyles }: GlobalProps) => `
    color: ${theme?.palette.colorTextTitle};
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTitle};
    text-align: left;
    line-height: 1.5;
  `}
`

const Subtitle = styled.span`
  ${({ theme = mainStyles }: GlobalProps) => `
    color: ${theme?.palette.colorTextDisabled};
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
    text-align: left;
    line-height: 1.5;
  `}
`

export const Headline: VFC<Props> = ({ title, subtitle }) => (
  <Wrapper>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Wrapper>
)
