import { Button } from 'components/ui'
import { SubtitleExtraLarge, TitleExtraLarge } from 'components/ui/heading'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps as StyledProps } from 'types/global'
import { isAlbum, Media } from 'types/media'
import { renderSubTitle } from '../utils'

type Props = {
  mediaInfo?: Media
} & StyledProps

const Background = styled.div<Props>`
  ${({ theme = mainStyles, mediaInfo }: Props) => `
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
  margin: 10px;
`

export const CustomTitleExtraLarge = styled(TitleExtraLarge)`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextTitleLarge};
    padding-top: 10px;
    padding-left: 10px;
  `}
`

export const CustomSubtitleExtraLarge = styled(SubtitleExtraLarge)`
  ${({ theme = mainStyles }: StyledProps) => `
    color: ${theme.palette.colorTextSubtitleLarge};
    padding-left: 10px;
    padding-bottom: 30px;
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
