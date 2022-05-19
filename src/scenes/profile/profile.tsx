import { FC } from 'react'
import styled from 'styled-components'
import { Song, User } from 'types/media'
import { ProfileCard } from 'components/profile/card/card'
import { FollowingList } from 'components/profile/followingList/followingList'
import { ContainerFlexRow } from 'components/ui'
import { useGetMediaList } from 'hooks/useGetMediaList'
import { BeatLoader } from 'components/loader'
import { useGetUserFollows } from 'hooks/useGetUserFollows'
import { getOwnSavedSongs } from 'api/data/own'

type Props = {
  user: User
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme }) => `
    padding: ${theme.divSpacingExtraBig};
    overflow-y: scroll;
    height: calc(100% - 2 * ${theme.divSpacingExtraBig});

    @media (max-width: 999px) {
      flex-direction: column;
    }

    @media (max-width: 576px) {
      padding: ${theme.divSpacingMedium};
      height: calc(100% - 2 * ${theme.divSpacingMedium});
    }
  `}
`

export const Profile: FC<Props> = ({ user }) => {
  const {
    mediaList: followList,
    nextURL,
    fetchMoreMedia: fetchMoreFollows,
    totalCount: userFollowingCount,
    isLoading: isLoadingFollows,
  } = useGetUserFollows()

  const savedMusic = useGetMediaList<Song>(getOwnSavedSongs)
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
