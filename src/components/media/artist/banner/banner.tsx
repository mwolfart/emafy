import { setFollowingArtist } from 'api/data/own'
import { IconButton } from 'components/ui'
import {
  SubtitleExtraLarge,
  TitleExtraLarge,
} from 'components/ui/heading/heading'
import { PlayerContext } from 'contexts/player'
import { FC, useContext } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { DetailedArtist } from 'types/media'
import { RelatedArtists } from './relatedArtists'

interface Props {
  artistInfo: DetailedArtist
  setArtistInfo: (artistInfo: DetailedArtist) => void
  subtitle: string
}

interface StyledProps {
  artistInfo?: DetailedArtist
}

const Background = styled.div<StyledProps>`
  ${({ theme, artistInfo }) => `
    background-image: ${theme.palette.gradientBanner},
    ${artistInfo && artistInfo.images && `url(${artistInfo.images[0]})`};
    background-size: cover;
    background-position-y: center;
    padding: 30px 60px;

    @media (min-width: 768px) {
      padding: 60px 120px;
    }
  `}
`

const CustomTitleExtraLarge = styled(TitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorTextNegative};
    padding-top: ${theme.divSpacingSmall};
    padding-left: ${theme.divSpacingSmall};
  `}
`

const CustomSubtitleExtraLarge = styled(SubtitleExtraLarge)`
  ${({ theme }) => `
    color: ${theme.palette.colorGray300};
    padding-left: ${theme.divSpacingSmall};
    padding-bottom: ${theme.divSpacingBig};
  `}
`

const ButtonsWrapper = styled.div`
  ${({ theme }) => `
  display: flex;
  flex-direction: row;
  button:first-child {
    margin-right: ${theme.divSpacingBig};
  }
  `}
`

export const ArtistBanner: FC<Props> = ({
  artistInfo,
  setArtistInfo,
  subtitle,
}) => {
  const playerContext = useContext(PlayerContext)
  const followBtnIcon = artistInfo.currentUserFollows
    ? 'fa-user-minus'
    : 'fa-user-plus'
  const followBtnLabel = artistInfo.currentUserFollows
    ? strings.ui.unfollow
    : strings.ui.follow
  const updateArtist = (isFollowing: boolean): void => {
    setArtistInfo(
      Object.assign({}, artistInfo, { currentUserFollows: isFollowing }),
    )
  }
  const followBtnCallback = async (): Promise<void> => {
    await setFollowingArtist(
      artistInfo.id,
      'artist',
      !artistInfo.currentUserFollows,
    )
    updateArtist(!artistInfo.currentUserFollows)
  }
  const playBtnCallback = (): void => playerContext.playArtist(artistInfo.id)

  return (
    <Background artistInfo={artistInfo}>
      <CustomTitleExtraLarge>{artistInfo.name}</CustomTitleExtraLarge>
      <CustomSubtitleExtraLarge>{subtitle}</CustomSubtitleExtraLarge>
      <ButtonsWrapper>
        <IconButton
          icon={followBtnIcon}
          onClickCallback={followBtnCallback}
          title={followBtnLabel}
        />
        <IconButton
          icon="fa-play"
          onClickCallback={playBtnCallback}
          title={strings.ui.play}
        />
      </ButtonsWrapper>
      <RelatedArtists artistList={artistInfo.relatedArtists} />
    </Background>
  )
}
