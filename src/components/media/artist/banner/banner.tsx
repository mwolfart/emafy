import { unfollowArtist, followArtist } from 'api/data'
import { IconButton } from 'components/ui'
import { SubtitleExtraLarge, TitleExtraLarge } from 'components/ui/heading'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { DetailedArtist } from 'types/media'
import { RelatedArtists } from './relatedArtists'

type Props = {
  artistInfo: DetailedArtist
  subtitle: string
}

type StyledProps = {
  artistInfo?: DetailedArtist
}

const Background = styled.div<StyledProps>`
  ${({ theme, artistInfo }) => `
    background-image: linear-gradient(
      to bottom, 
      ${theme.palette.colorBackgroundBannerEdge},
      ${theme.palette.colorBackgroundBannerCenter} 50%, 
      ${theme.palette.colorBackgroundBannerEdge}),
    ${artistInfo && artistInfo.images && `url(${artistInfo.images[0]})`};
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

export const ArtistBanner: VFC<Props> = ({ artistInfo, subtitle }) => {
  const buttonIcon = artistInfo.currentUserFollows
    ? 'fa-user-minus'
    : 'fa-user-plus'
  const buttonLabel = artistInfo.currentUserFollows
    ? strings.scenes.artistDetail.unfollow
    : strings.scenes.artistDetail.follow
  const buttonCallback = artistInfo.currentUserFollows
    ? () => unfollowArtist(artistInfo.id, 'artist')
    : () => followArtist(artistInfo.id, 'artist')

  return (
    <Background artistInfo={artistInfo}>
      <CustomTitleExtraLarge>{artistInfo?.name}</CustomTitleExtraLarge>
      <CustomSubtitleExtraLarge>{subtitle}</CustomSubtitleExtraLarge>
      <IconButton
        icon={buttonIcon}
        onClickCallback={buttonCallback}
        title={buttonLabel}
      />
      <RelatedArtists artistList={artistInfo.relatedArtists} />
    </Background>
  )
}
