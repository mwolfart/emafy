import { TitleNormal, SubtitleNormal } from 'components/ui/index'
import { GlobalProps } from 'types/global'
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
    <TitleNormal>{mediaInfo.name}</TitleNormal>
    <SubtitleNormal>{renderSubTitle(mediaInfo)}</SubtitleNormal>
  </Wrapper>
)
