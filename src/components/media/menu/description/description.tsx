import { TitleNormal, SubtitleNormal } from 'components/ui/index'
import { FC } from 'react'
import styled from 'styled-components'
import { Media } from 'types/media'
import { abbreviateText, renderSubTitle } from 'utils/utils'

interface Props {
  mediaInfo: Media
  rowVariant?: boolean
}

interface StyledProps {
  rowVariant?: boolean
}

const Wrapper = styled.div<StyledProps>`
  ${({ rowVariant, theme }) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme.fontBoldTwo};
    width: 100%;
    height: ${rowVariant ? 'auto' : '80px'};
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

export const MediaDescription: FC<Props> = ({ mediaInfo, rowVariant }) => {
  const title = rowVariant ? mediaInfo.name : abbreviateText(mediaInfo.name, 45)
  const subtitleText = renderSubTitle(mediaInfo)
  const subtitle = rowVariant ? subtitleText : abbreviateText(subtitleText, 30)
  return (
    <Wrapper rowVariant={rowVariant}>
      <PaddedTitle>{title}</PaddedTitle>
      <PaddedSubtitle>{subtitle}</PaddedSubtitle>
    </Wrapper>
  )
}
