import { Album, Song } from 'types/media'
import { VFC } from 'react'
import { ContainerFlexRow, Headline, Rectangle } from 'components/ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { BeatLoader } from 'components/loader'
import { NextURL } from 'api/data'
import { formatDuration } from 'components/media/utils'

type Props = {
  albumInfo: Album
  trackList: Song[]
  fetchMoreAlbumTracks: () => void
  nextURL: NextURL
}

const Dash = styled.div`
  ${({ theme }) => `
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
  `}
`

const ScrollWrapper = styled.div`
  max-height: 500px;
  overflow-y: scroll;
`

const TrackWrapper = styled(ContainerFlexRow)`
  span {
    flex-grow: 1;
  }
`

const Footer = styled.div`
  text-align: center;
`

export const AlbumCard: VFC<Props> = ({
  albumInfo,
  trackList,
  fetchMoreAlbumTracks,
  nextURL,
}) => {
  return (
    <Rectangle>
      <Headline title={albumInfo.name} subtitle={albumInfo.artists[0].name} />
      <Dash />
      <ScrollWrapper>
        <InfiniteScroll
          dataLength={trackList.length}
          next={fetchMoreAlbumTracks}
          hasMore={trackList.length < albumInfo.totalTracks && nextURL !== null}
          loader={<BeatLoader />}
        >
          {trackList.map((track) => (
            <TrackWrapper>
              <p>{track.id}</p>
              <span>{track.name}</span>
              <p>{formatDuration(track.duration)}</p>
            </TrackWrapper>
          ))}
        </InfiniteScroll>
      </ScrollWrapper>
      <Dash />
      <Footer>Show Related</Footer>
    </Rectangle>
  )
}
