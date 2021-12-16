import { Album } from 'types/media'
import { VFC } from 'react'
import {
  ContainerFlexRow,
  GrayIconButton,
  Headline,
  Rectangle,
} from 'components/ui'
import InfiniteScroll from 'react-infinite-scroll-component'
import styled from 'styled-components'
import { BeatLoader } from 'components/loader'
import { getAlbumTracks, NextURL } from 'api/data'
import { formatDuration, formatTrackNumber } from 'components/media/utils'
import { useGetSavedMedia } from 'hooks/useGetSavedMedia'

type Props = {
  albumInfo: Album
  fnCloseSnippet: () => void
}

const Dash = styled.div`
  ${({ theme }) => `
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
  `}
`

const ScrollWrapper = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`

const TrackWrapper = styled(ContainerFlexRow)`
  ${({ theme }) => `
    align-items: center;
    p {
      color: ${theme.palette.colorTextDisabled};
    }
    span {
      flex-grow: 1;
      justify-content: center;
      padding: 0 ${theme.divSpacingSmall};
    }
  `}
`

const Footer = styled.div`
  ${({ theme }) => `
    text-align: center;
    color: ${theme.palette.colorPrimary};
    font-weight: bold;
    padding-top: ${theme.divSpacingMedium};
  `}
`

export const AlbumCard: VFC<Props> = ({ albumInfo, fnCloseSnippet }) => {
  const {
    mediaList: trackList,
    fetchMoreMedia: fetchMoreTracks,
    nextURL,
    isLoading,
  } = useGetSavedMedia((next?: NextURL) => getAlbumTracks(albumInfo, next))

  return (
    <Rectangle>
      <GrayIconButton iconClass="fa-times" onClickCallback={fnCloseSnippet} />
      <Headline title={albumInfo.name} subtitle={albumInfo.artists[0].name} />
      <Dash />
      {isLoading ? (
        <BeatLoader />
      ) : (
        <ScrollWrapper>
          <InfiniteScroll
            dataLength={trackList.length}
            next={fetchMoreTracks}
            hasMore={
              trackList.length < albumInfo.totalTracks && nextURL !== null
            }
            loader={<BeatLoader />}
          >
            {trackList.map((track) => (
              <TrackWrapper>
                <p>{formatTrackNumber(track.trackNumber)}</p>
                <span>{track.name}</span>
                <p>{formatDuration(track.duration)}</p>
              </TrackWrapper>
            ))}
          </InfiniteScroll>
        </ScrollWrapper>
      )}
      <Dash />
      <Footer>Show Related</Footer>
    </Rectangle>
  )
}
