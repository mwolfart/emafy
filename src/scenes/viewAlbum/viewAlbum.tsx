import { getAlbumTracks, NextURL } from 'api/data'
import { Banner } from 'components/media/banner/banner'
import { TrackList } from 'components/trackList/trackList'
import { useCallback, useEffect, useState, VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { strings } from 'strings'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps as StyledProps } from 'types/global'
import { Album, Song } from 'types/media'

type Props = {
  albumInfo: Album
} & StyledProps

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

export const ViewAlbum: VFC<Props> = ({ albumInfo }) => {
  const [albumTracks, setAlbumTracks] = useState<Song[]>([])
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [totalCount, setTotalCount] = useState<number>(0)

  const storeMoreTracks = ({
    entities,
    next,
    total,
  }: AlbumTracksResponse): void => {
    setAlbumTracks(albumTracks.concat(entities))
    totalCount === 0 && setTotalCount(total)
    setNextURL(next)
  }

  const storeFirstTracks = ({
    entities,
    next,
    total,
  }: AlbumTracksResponse): void => {
    setAlbumTracks(entities)
    setTotalCount(total)
    setNextURL(next)
  }

  const fetchAlbumTracks = useCallback(
    (
      callback: (response: AlbumTracksResponse) => void,
      nextURL?: NextURL,
    ): void => {
      getAlbumTracks(albumInfo, nextURL)
        .then(callback)
        .catch(() => {
          alert(strings.scenes.albums.errorLoadingAlbumTracks)
        })
    },
    [albumInfo],
  )

  useEffect(() => {
    fetchAlbumTracks(storeFirstTracks)
  }, [fetchAlbumTracks])

  return (
    <InfiniteScroll
      dataLength={albumTracks.length}
      next={() => fetchAlbumTracks(storeMoreTracks, nextURL)}
      hasMore={albumTracks.length < totalCount && nextURL != null}
      loader={'Loading...'}
    >
      <Banner mediaInfo={albumInfo} />
      <MenuWrapper>
        <TrackList trackList={albumTracks} />
      </MenuWrapper>
    </InfiniteScroll>
  )
}
