import { NextURL } from 'api/data'
import { Headline } from 'components/ui'
import { VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { SimpleArtist } from 'types/media'
import { Follow } from '../follow/follow'

type Props = {
  followList: SimpleArtist[]
  followCount: number
  nextURL: NextURL
  fetchMoreFollows: () => void
}

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: 0 ${theme.divSpacingExtraBig};
    width: 50%;
  `}
`

export const FollowingList: VFC<Props> = ({
  followList,
  followCount,
  nextURL,
  fetchMoreFollows,
}) => {
  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={followList.length}
        next={fetchMoreFollows}
        hasMore={followList.length < followCount && nextURL !== null}
        loader={'Loading...'}
      >
        <Headline title="Followed artists" subtitle={followCount.toString()} />
        {followList.map((follow) => (
          <Follow
            follow={follow}
            isCurrentUserFollowing={!!follow.isCurrentUserFollowing}
            key={follow.id}
          />
        ))}
      </InfiniteScroll>
    </Wrapper>
  )
}
