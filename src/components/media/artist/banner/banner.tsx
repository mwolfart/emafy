import { IconButton } from 'components/ui'
import { SubtitleExtraLarge, TitleExtraLarge } from 'components/ui/heading'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { Media, SimpleArtist } from 'types/media'
import { RelatedArtists } from './relatedArtists'

type Props = {
  mediaInfo: Media
  subtitle: string
  relatedArtists: SimpleArtist[]
}

type StyledProps = {
  mediaInfo?: Media
}

const Background = styled.div<StyledProps>`
  ${({ theme, mediaInfo }) => `
    background-image: linear-gradient(
      to bottom, 
      ${theme.palette.colorBackgroundBannerEdge},
      ${theme.palette.colorBackgroundBannerCenter} 50%, 
      ${theme.palette.colorBackgroundBannerEdge}),
    ${mediaInfo && mediaInfo.images && `url(${mediaInfo.images[0]})`};
    background-size: cover;
    background-position-y: center;
    padding: 60px 120px;
  `}
`

const CustomTitleExtraLarge = styled(TitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextTitleLarge};
    padding-top: ${theme.divSpacingSmall};
    padding-left: ${theme.divSpacingSmall};
  `}
`

const CustomSubtitleExtraLarge = styled(SubtitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextSubtitleLarge};
    padding-left: ${theme.divSpacingSmall};
    padding-bottom: ${theme.divSpacingBig};
  `}
`

export const ArtistBanner: VFC<Props> = ({
  mediaInfo,
  subtitle,
  relatedArtists,
}) => (
  <Background mediaInfo={mediaInfo}>
    <CustomTitleExtraLarge>{mediaInfo?.name}</CustomTitleExtraLarge>
    <CustomSubtitleExtraLarge>{subtitle}</CustomSubtitleExtraLarge>
    <IconButton
      icon="fa-user-plus"
      onClickCallback={() => {}}
      title={strings.scenes.artistDetail.follow}
    />
    <RelatedArtists artistList={relatedArtists} />
  </Background>
)
