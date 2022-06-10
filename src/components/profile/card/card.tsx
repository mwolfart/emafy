import { Avatar } from 'components/ui'
import {
  Headline,
  GrayIconButton,
  IconHeadline,
  Rectangle,
  IconButton,
} from 'components/ui'
import { ContainerFlexRow } from 'components/ui/container/container'
import { FC } from 'react'
import styled from 'styled-components'

import { User } from 'types/media'
import { strings } from 'strings'

interface Props {
  user: User
  followingCount: number
  savedMusicCount: number
  playlistCount: number
}

const Wrapper = styled(Rectangle)`
  ${({ theme }) => `
    width: 50%;
    height: fit-content;
    box-shadow: ${theme?.shadowDimensionsTiny};

    @media (max-width: 999px) {
      width: auto;
    }
  `}
`

const Dash = styled.div`
  ${({ theme }) => `
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
  `}
`

const FlexRowAlignRight = styled(ContainerFlexRow)`
  justify-content: right;
`

export const ProfileCard: FC<Props> = ({
  user,
  followingCount,
  savedMusicCount,
  playlistCount,
}) => {
  const userImage = (user.images?.length && user.images[0]) || ''
  const userFollowerCount = user.followerCount.toString()
  const userFollowingCount = followingCount.toString()
  const userSavedMusicCount = savedMusicCount.toString()
  const userPlaylistCount = playlistCount.toString()

  return (
    <Wrapper>
      <FlexRowAlignRight>
        <GrayIconButton iconClass="fa-star" onClickCallback={() => {}} />
        <GrayIconButton iconClass="fa-dots" onClickCallback={() => {}} />
      </FlexRowAlignRight>
      <Avatar imagePath={userImage} />
      <ContainerFlexRow>
        <Headline title={user.name} subtitle={user.country} />
        <IconButton icon="fa-user-check" onClickCallback={() => {}} />
      </ContainerFlexRow>
      <Dash />
      <IconHeadline
        icon="fa-user-friends"
        title={userFollowerCount}
        subtitle={strings.components.profile.card.followers}
      />
      <IconHeadline
        icon="fa-user-friends"
        title={userFollowingCount}
        subtitle={strings.components.profile.card.followedArtists}
      />
      <IconHeadline
        icon="fa-music"
        title={userSavedMusicCount}
        subtitle={strings.components.profile.card.tracks}
      />
      <Dash />
      <IconHeadline
        icon="fa-list"
        title={userPlaylistCount}
        subtitle={strings.components.profile.card.playlists}
      />
    </Wrapper>
  )
}
