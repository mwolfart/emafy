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
    flex-grow: 1;
    height: fit-content;
    box-shadow: ${theme.shadowDimensionsTiny};
    padding-top: ${theme.divSpacingExtraBig};
  `}
`

const Dash = styled.div`
  ${({ theme }) => `
    border-bottom: 2px solid ${theme.palette.colorGray300};
  `}
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
      <Avatar imagePath={userImage} />
      <ContainerFlexRow>
        <Headline title={user.name} subtitle={user.country} />
      </ContainerFlexRow>
      <Dash />
      <IconHeadline
        icon="fa-user-friends"
        title={userFollowerCount}
        subtitle={strings.ui.followers}
      />
      <IconHeadline
        icon="fa-user-friends"
        title={userFollowingCount}
        subtitle={strings.ui.followedArtists}
      />
      <IconHeadline
        icon="fa-music"
        title={userSavedMusicCount}
        subtitle={strings.ui.tracks}
      />
      <Dash />
      <IconHeadline
        icon="fa-list"
        title={userPlaylistCount}
        subtitle={strings.ui.playlists}
      />
    </Wrapper>
  )
}
