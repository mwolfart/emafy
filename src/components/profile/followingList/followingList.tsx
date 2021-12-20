import { NextURL } from 'api/data'
import { BeatLoader } from 'components/loader'
import { Headline } from 'components/ui'
import { VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { strings } from 'strings'
import styled from 'styled-components'

import { SimpleArtist } from 'types/media'
import { Follow } from '../follow/follow'

type Props = {
  followList: SimpleArtist[]
  followCount: number
  nextURL: NextURL
  fetchMoreFollows: () => void
}

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingExtraBig};
    width: 50%;
    overflow-y: scroll;

    @media (max-width: 999px) {
      width: auto;
      margin-top: ${theme.divSpacingExtraBig};
      min-height: 800px;
    }

    @media (max-width: 576px) {
      margin-top: ${theme.divSpacingMedium};
      padding: 0 ${theme.divSpacingMedium};
    }
  `}
`

export const FollowingList: VFC<Props> = ({
  followList,
  followCount,
  nextURL,
  fetchMoreFollows,
}) => {
  return (
    <Wrapper id="followListWrapper">
      <InfiniteScroll
        dataLength={followList.length}
        next={fetchMoreFollows}
        hasMore={followList.length < followCount && nextURL !== null}
        loader={<BeatLoader />}
        scrollableTarget="followListWrapper"
      >
        <Headline
          title={strings.components.profile.followedArtists}
          subtitle={followCount.toString()}
        />
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
