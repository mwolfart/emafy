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

const MenuWrapper = styled.div`
  ${({ theme = mainStyles }: StyledProps) => `
    padding: ${theme.divSpacingMedium};
  `}
`

export const ViewAlbum: VFC<Props> = ({ albumInfo }) => {
  const [albumTracks, setAlbumTracks] = useState<Song[]>([])
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [totalCount, setTotalCount] = useState<number>(0)

  const fetchMoreAlbumTracks = useCallback((): void => {
    getAlbumTracks(albumInfo, nextURL)
      .then(({ entities: trackList, next, total }) => {
        setAlbumTracks(albumTracks.concat(trackList))
        totalCount === 0 && setTotalCount(total)
        setNextURL(next)
      })
      .catch((e) => {
        alert(strings.scenes.albums.errorLoadingAlbumTracks)
      })
  }, [albumInfo, albumTracks, totalCount, nextURL])

  useEffect(() => {
    fetchMoreAlbumTracks()
  }, [fetchMoreAlbumTracks])

  return (
    <InfiniteScroll
      dataLength={albumTracks.length}
      next={fetchMoreAlbumTracks}
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
