import { getFollowedUsers } from 'api/data'
import { Headline } from 'components/ui'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'
import { VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { SimpleArtist, User } from 'types/media'
import { Follow } from '../follow/follow'

type Props = {
  user: User
}

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: 0 ${theme.divSpacingExtraBig};
    width: 50%;
  `}
`

export const FollowingList: VFC<Props> = ({ user }) => {
  const followingArtists = useGetSavedMedia<SimpleArtist>(getFollowedUsers)
  const followingCount = followingArtists.totalCount
  const followingList = followingArtists.mediaList
  const { nextURL, fetchMoreMedia } = followingArtists

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={followingList.length}
        next={fetchMoreMedia}
        hasMore={followingList.length < followingCount && nextURL !== null}
        loader={'Loading...'}
      >
        <Headline title="Following" subtitle={followingCount.toString()} />
        {followingList.map((following) => (
          <Follow follow={following} />
        ))}
      </InfiniteScroll>
    </Wrapper>
  )
}
