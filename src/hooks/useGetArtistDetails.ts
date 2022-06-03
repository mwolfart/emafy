import {
  getArtist,
  getArtistTopTracks,
  getArtistRelatedArtists,
} from 'api/data/artists'
import { checkIfOwnFollowsArtist } from 'api/data/own'
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
    let aborted = false
    const fetch = async (): Promise<void> => {
      try {
        const artistRequest = getArtist(artistId)
        const topTracksRequest = getArtistTopTracks(artistId)
        const relatedArtistsRequest = getArtistRelatedArtists(artistId)
        const checkFollowingRequest = checkIfOwnFollowsArtist(
          artistId,
          'artist',
        )
        const { entities: artistInfo } = await artistRequest
        const { entities: topTracksList } = await topTracksRequest
        const { entities: relatedArtists } = await relatedArtistsRequest
        const currentUserFollows = await checkFollowingRequest

        if (!aborted) {
          setArtistInfo({
            ...artistInfo,
            relatedArtists,
            topTracks: topTracksList,
            currentUserFollows,
          })
        }
      } finally {
        !aborted && setIsLoading(false)
      }
    }
    fetch()
    return () => {
      aborted = true
    }
  }, [artistId])

  return {
    artistInfo,
    setArtistInfo,
    isLoading,
  }
}
