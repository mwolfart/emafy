import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
  getArtistRelatedArtists,
} from 'api/data'
import { cancellableRequest } from 'api/utils'
import { useEffect, useState } from 'react'
import { Album, SimpleArtist, Song } from 'types/media'
import { ArtistDetailsQuery } from 'types/mediaQuery'

export function useGetArtistDetails(artistId: string): ArtistDetailsQuery {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [artistInfo, setArtistInfo] = useState<SimpleArtist | undefined>()
  const [relatedArtists, setRelatedArtists] = useState<SimpleArtist[]>([])
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([])
  const [artistTotalAlbums, setArtistTotalAlbums] = useState<number>(0)
  const [artistTopTracks, setArtistTopTracks] = useState<Song[]>([])

  useEffect(() => {
    return cancellableRequest(
      () =>
        Promise.all([
          getArtist(artistId),
          getArtistAlbums(artistId),
          getArtistTopTracks(artistId),
          getArtistRelatedArtists(artistId),
        ]),
      ([
        { entities: artistInfo },
        { entities: albumList, total: totalAlbums },
        { entities: topTracksList },
        { entities: relatedArtists },
      ]) => {
        setArtistInfo(artistInfo)
        setRelatedArtists(relatedArtists)
        setIsLoading(false)
        setArtistAlbums(albumList)
        setArtistTotalAlbums(totalAlbums)
        setArtistTopTracks(topTracksList)
      },
      () => {},
      () => {
        setIsLoading(false)
      },
    )
  }, [artistId])

  return {
    artistInfo,
    relatedArtists,
    artistAlbums,
    artistTotalAlbums,
    artistTopTracks,
    isLoading,
  }
}
