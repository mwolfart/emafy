import { TitleNormal, SubtitleNormal } from 'components/ui/index'
import { GlobalProps } from 'types/global'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { renderSubTitle } from '../utils'
import { mainStyles } from 'styles'

type Props = {
  mediaInfo: Media
} & GlobalProps

const Wrapper = styled.div<GlobalProps>`
  ${({ theme = mainStyles }: GlobalProps) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
  `}
`

const PaddedTitle = styled(TitleNormal)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding-left: ${theme.divSpacingSmall};
    padding-bottom: ${theme.divSpacingSmall};
  `}
`

const PaddedSubtitle = styled(SubtitleNormal)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding-left: ${theme.divSpacingSmall};
  `}
`

export const Description: VFC<Props> = ({ mediaInfo }) => (
  <Wrapper>
    <PaddedTitle>{mediaInfo.name}</PaddedTitle>
    <PaddedSubtitle>{renderSubTitle(mediaInfo)}</PaddedSubtitle>
  </Wrapper>
)
