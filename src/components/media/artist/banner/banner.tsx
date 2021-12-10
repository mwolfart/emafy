import { Button } from 'components/ui'
import { SubtitleExtraLarge, TitleExtraLarge } from 'components/ui/heading'
import { VFC } from 'react'
import styled from 'styled-components'
import { isAlbum, Media } from 'types/media'
import { renderSubTitle } from '../../utils'

type Props = {
  mediaInfo?: Media
}

interface IProps {
  mediaInfo?: Media
}

const Background = styled.div<IProps>`
  ${({ theme, mediaInfo }) => `
    background-image: linear-gradient(
      to bottom, 
      ${theme.palette.colorBackgroundBannerEdge},
      ${theme.palette.colorBackgroundBannerCenter} 50%, 
      ${theme.palette.colorBackgroundBannerEdge}),
    ${mediaInfo && mediaInfo.images && `url(${mediaInfo.images[0]})`};
    background-size: cover;
    background-position-y: center;
    padding: 120px;
  `}
`

const SaveButton = styled(Button)`
  ${({ theme }) => `
    margin: ${theme.divSpacingSmall};
  `}
`

export const CustomTitleExtraLarge = styled(TitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextTitleLarge};
    padding-top: ${theme.divSpacingSmall};
    padding-left: ${theme.divSpacingSmall};
  `}
`

export const CustomSubtitleExtraLarge = styled(SubtitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextSubtitleLarge};
    padding-left: ${theme.divSpacingSmall};
    padding-bottom: ${theme.divSpacingBig};
  `}
`

export const Banner: VFC<Props> = ({ mediaInfo }) => {
  const countSubtitle =
    mediaInfo && isAlbum(mediaInfo) ? `${mediaInfo.totalTracks} songs` : ''
  const subtitle = mediaInfo && `${renderSubTitle(mediaInfo)}, ${countSubtitle}`

  return (
    <Background mediaInfo={mediaInfo}>
      <CustomTitleExtraLarge>{mediaInfo?.name}</CustomTitleExtraLarge>
      <CustomSubtitleExtraLarge>{subtitle}</CustomSubtitleExtraLarge>
      <SaveButton>Save</SaveButton>
    </Background>
  )
}
