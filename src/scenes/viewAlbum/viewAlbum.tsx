import { getAlbum, getAlbumTracks, NextURL } from 'api/data'
import { cancellableRequest } from 'api/utils'
import { BeatLoader } from 'components/loader'
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

type Props = {
  albumInfo: Album
} & RouteComponentProps<MatchParams> &
  StyledProps

type AlbumTracksResponse = {
  entities: Song[]
  next: NextURL
  total: number
}

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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchAlbumTracks = (album: Album): void => {
      getAlbumTracks(album)
        .then(({ entities, next, total }: AlbumTracksResponse) => {
          setAlbumTracks(entities)
          setTotalCount(total)
          setNextURL(next)
        })
        .catch(() => {
          alert(strings.scenes.albums.errorLoadingAlbumTracks)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    const fetchAlbum = (): void => {
      cancellableRequest(
        () => getAlbum(match.params.id),
        ({ entities: loadedAlbum }) => {
          setAlbumInfo(loadedAlbum)
          fetchAlbumTracks(loadedAlbum)
        },
        () => {
          alert(strings.scenes.albums.errorLoadingAlbum)
          setIsLoading(false)
        },
      )
    }

    fetchAlbum()
  }, [match.params.id])

  const fetchMoreAlbumTracks = (): void => {
    if (albumInfo) {
      getAlbumTracks(albumInfo, nextURL)
        .then(({ entities, next }: AlbumTracksResponse) => {
          setAlbumTracks(albumTracks.concat(entities))
          setNextURL(next)
        })
        .catch(() => {
          alert(strings.scenes.albums.errorLoadingAlbumTracks)
        })
    }
  }

  return isLoading ? (
    <BeatLoader />
  ) : (
    <InfiniteScroll
      dataLength={albumTracks.length}
      next={fetchMoreAlbumTracks}
      hasMore={albumTracks.length < totalCount && nextURL != null}
      loader={<BeatLoader />}
    >
      <Banner mediaInfo={albumInfo} />
      <MenuWrapper>
        <TrackList trackList={albumTracks} />
      </MenuWrapper>
    </InfiniteScroll>
  )
}
