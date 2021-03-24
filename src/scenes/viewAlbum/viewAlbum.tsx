import { getAlbum, getAlbumTracks, NextURL } from 'api/data'
import { Banner } from 'components/media/banner/banner'
import { TrackList } from 'components/trackList/trackList'
import { useEffect, useState, VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { RouteComponentProps } from 'react-router'
import { strings } from 'strings'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps as StyledProps } from 'types/global'
import { Album, Song } from 'types/media'

type MatchParams = {
  id: string
}

type Props = {} & RouteComponentProps<MatchParams> & StyledProps

const MenuWrapper = styled.div`
  ${({ theme = mainStyles }: StyledProps) => `
    padding: ${theme.divSpacingMedium};
  `}
`

export const ViewAlbum: VFC<Props> = ({ match }) => {
  const [albumInfo, setAlbumInfo] = useState<Album | undefined>()
  const [albumTracks, setAlbumTracks] = useState<Song[]>([])
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [totalCount, setTotalCount] = useState<number>(0)

  const fetchMoreAlbumTracks = (): void => {
    if (albumInfo) {
      getAlbumTracks(albumInfo.id, nextURL).then(
        ({ entities: trackList, next }) => {
          trackList.map((track) => (track.albumReference = albumInfo?.id))
          setAlbumTracks(albumTracks.concat(trackList))
          setNextURL(next)
        },
      )
    }
  }

  useEffect(() => {
    getAlbum(match.params.id)
      .then(({ entities: album }) => {
        setAlbumInfo(album)
      })
      .catch((e) => {
        alert(e)
      })
  }, [match])

  useEffect(() => {
    if (albumInfo) {
      getAlbumTracks(albumInfo.id)
        .then(({ entities: albumTrackList, next, total }) => {
          albumTrackList.map((track) => (track.albumReference = albumInfo?.id))
          setAlbumTracks(albumTrackList)
          setTotalCount(total)
          setNextURL(next)
        })
        .catch((e) => {
          alert(strings.scenes.albums.errorLoadingAlbums)
        })
    }
  }, [albumInfo])

  return (
    <InfiniteScroll
      dataLength={albumTracks.length}
      next={fetchMoreAlbumTracks}
      hasMore={albumTracks.length < totalCount && nextURL !== null}
      loader={'Loading...'}
    >
      <Banner mediaInfo={albumInfo} />
      <MenuWrapper>
        <TrackList trackList={albumTracks} />
      </MenuWrapper>
    </InfiniteScroll>
  )
}
