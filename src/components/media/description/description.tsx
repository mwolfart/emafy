import { Title, Subtitle } from 'components/ui/index'
import { GlobalProps } from 'types/globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { renderSubTitle } from '../utils'

type Props = {
  mediaInfo: Media
} & GlobalProps

const Wrapper = styled.div<GlobalProps>`
  ${({ theme }: GlobalProps) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
  `}
`

export const Description: VFC<Props> = ({ mediaInfo }) => (
  <Wrapper>
    <Title>{mediaInfo.name}</Title>
    <Subtitle>{renderSubTitle(mediaInfo)}</Subtitle>
  </Wrapper>
)