import {
  getArtist,
  getArtistTopTracks,
  getArtistRelatedArtists,
  checkIfOwnFollowsArtist,
} from 'api/data'
import { cancellableRequest } from 'api/utils'
import { useEffect, useState } from 'react'
import { DetailedArtist, MediaType } from 'types/media'
import { ArtistDetailsQuery } from 'types/mediaQuery'

export function useGetArtistDetails(artistId: string): ArtistDetailsQuery {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [artistInfo, setArtistInfo] = useState<DetailedArtist>({
    name: '',
    id: '',
    genres: [],
    followers: 0,
    popularity: 0,
    relatedArtists: [],
    topTracks: [],
    currentUserFollows: false,
    mediaType: MediaType.artist,
  })

  useEffect(() => {
    return cancellableRequest(
      () =>
        Promise.all([
          getArtist(artistId),
          getArtistTopTracks(artistId),
          getArtistRelatedArtists(artistId),
          checkIfOwnFollowsArtist(artistId, 'artist'),
        ]),
      ([
        { entities: artistInfo },
        { entities: topTracksList },
        { entities: relatedArtists },
        currentUserFollows,
      ]) => {
        setArtistInfo({
          ...artistInfo,
          relatedArtists,
          topTracks: topTracksList,
          currentUserFollows,
        })
        setIsLoading(false)
      },
      () => {},
      () => {
        setIsLoading(false)
      },
    )
  }, [artistId])

  return {
    artistInfo,
    setArtistInfo,
    isLoading,
  }
}
