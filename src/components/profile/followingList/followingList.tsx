import { getOwnFollowedUsers } from 'api/data'
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
  const followedArtists = useGetSavedMedia<SimpleArtist>(getOwnFollowedUsers)
  const followCount = followedArtists.totalCount
  const followList = followedArtists.mediaList
  const { nextURL, fetchMoreMedia } = followedArtists

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={followList.length}
        next={fetchMoreMedia}
        hasMore={followList.length < followCount && nextURL !== null}
        loader={'Loading...'}
      >
        <Headline title="Followed artists" subtitle={followCount.toString()} />
        {followList.map((follow) => (
          <Follow follow={follow} key={follow.id} />
        ))}
      </InfiniteScroll>
    </Wrapper>
  )
}
