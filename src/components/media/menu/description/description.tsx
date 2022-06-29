import { TitleNormal, SubtitleNormal } from 'components/ui/index'
import { FC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { renderSubTitle } from 'utils/utils'

interface Props {
  mediaInfo: Media
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme.fontBoldTwo};
    width: 100%;
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

export const MediaDescription: FC<Props> = ({ mediaInfo }) => (
  <Wrapper>
    <PaddedTitle>{mediaInfo.name}</PaddedTitle>
    <PaddedSubtitle>{renderSubTitle(mediaInfo)}</PaddedSubtitle>
  </Wrapper>
)
