import {
  checkIfOwnFollowsArtist,
  getOwnFollowedUsers,
  getOwnSavedSongs,
} from 'api/data'
import { useEffect, VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { SimpleArtist, Song, User } from 'types/media'
import { ProfileCard } from 'components/profile/card/card'
import { FollowingList } from 'components/profile/followingList/followingList'
import { ContainerFlexRow } from 'components/ui'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'

type Props = {
  user: User
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: ${theme.divSpacingExtraBig};
  `}
`

export const Profile: VFC<Props> = ({ user }) => {
  const followedArtists = useGetSavedMedia<SimpleArtist>(getOwnFollowedUsers)
  const followList = followedArtists.mediaList

  useEffect(() => {
    followList.forEach((follow) => {
      checkIfOwnFollowsArtist(follow.id, 'artist').then((isFollowing) => {
        follow.isCurrentUserFollowing = isFollowing
      })
    })
  }, [followList])

  const userFollowingCount = followedArtists.totalCount
  const { nextURL, fetchMoreMedia } = followedArtists

  const savedMusic = useGetSavedMedia<Song>(getOwnSavedSongs)
  const userSavedMusicCount = savedMusic.totalCount
  const playlistCount = 0

  return (
    <Wrapper>
      <ProfileCard
        user={user}
        followingCount={userFollowingCount}
        savedMusicCount={userSavedMusicCount}
        playlistCount={playlistCount}
      />
      <FollowingList
        followList={followList}
        followCount={userFollowingCount}
        nextURL={nextURL}
        fetchMoreFollows={fetchMoreMedia}
      />
    </Wrapper>
  )
}
