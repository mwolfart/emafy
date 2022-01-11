import {
  getArtist,
  getArtistAlbums,
  getArtistTopTracks,
  getArtistRelatedArtists,
} from 'api/data'
import { cancellableRequest } from 'api/utils'
import { useEffect, useState } from 'react'
import { Album, SimpleArtist } from 'types/media'

type UseGetArtistDetailsHookReturn = {
  artistInfo?: SimpleArtist
  relatedArtists: SimpleArtist[]
  artistAlbums: Album[]
  artistTotalAlbums: number
  isLoading: boolean
}

export function useGetArtistDetails(
  artistId: string,
): UseGetArtistDetailsHookReturn {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [artistInfo, setArtistInfo] = useState<SimpleArtist | undefined>()
  const [relatedArtists, setRelatedArtists] = useState<SimpleArtist[]>([])
  const [artistAlbums, setArtistAlbums] = useState<Album[]>([])
  const [artistTotalAlbums, setArtistTotalAlbums] = useState<number>(0)

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
    isLoading,
  }
}
