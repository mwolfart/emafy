import { TitleNormal, SubtitleNormal } from 'components/ui/index'

import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { renderSubTitle } from '../../../../utils/utils'

type Props = {
  mediaInfo: Media
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
  `}
`

const PaddedTitle = styled(TitleNormal)`
  ${({ theme }) => `
    padding-left: ${theme.divSpacingSmall};
    padding-bottom: ${theme.divSpacingSmall};
  `}
`

const PaddedSubtitle = styled(SubtitleNormal)`
  ${({ theme }) => `
    padding-left: ${theme.divSpacingSmall};
  `}
`

export const Description: VFC<Props> = ({ mediaInfo }) => (
  <Wrapper>
    <PaddedTitle>{mediaInfo.name}</PaddedTitle>
    <PaddedSubtitle>{renderSubTitle(mediaInfo)}</PaddedSubtitle>
  </Wrapper>
)
