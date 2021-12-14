import { getOwnSavedSongs } from 'api/data'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { Song, User } from 'types/media'
import { ProfileCard } from 'components/profile/card/card'
import { FollowingList } from 'components/profile/followingList/followingList'
import { ContainerFlexRow } from 'components/ui'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { BeatLoader } from 'components/loader'
import { useGetUserFollows } from 'hooks/useGetUserFollows'

type Props = {
  user: User
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: ${theme.divSpacingExtraBig};
  `}
`

export const Profile: VFC<Props> = ({ user }) => {
  const {
    followList,
    nextURL,
    fetchMoreFollows,
    totalCount: userFollowingCount,
    isLoading: isLoadingFollows,
  } = useGetUserFollows()

  const savedMusic = useGetSavedMedia<Song>(getOwnSavedSongs)
  const userSavedMusicCount = savedMusic.totalCount
  const playlistCount = 0

  const isLoading = savedMusic.isLoading || isLoadingFollows

  return isLoading ? (
    <BeatLoader />
  ) : (
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
        fetchMoreFollows={fetchMoreFollows}
      />
    </Wrapper>
  )
}
