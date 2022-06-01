import { faker } from '@faker-js/faker'
import { useGetArtistDetails } from './useGetArtistDetails'
import * as ApiArtist from 'api/data/artists'
import * as ApiOwn from 'api/data/own'
import { artist as mockedArtist } from 'fixtures/artist'
import { songs as mockedSongs } from 'fixtures/songs'
import { artists as mockedArtists } from 'fixtures/artists'
import { DetailedArtist } from 'types/media'
import { act, renderHook, waitFor } from '@testing-library/react'

describe('Get Artist Details hook', () => {
  test('should init hook correctly', async () => {
    const artistId = faker.random.word()

    jest.spyOn(ApiArtist, 'getArtist').mockResolvedValue({
      entities: mockedArtist,
    })
    jest.spyOn(ApiArtist, 'getArtistTopTracks').mockResolvedValue({
      entities: mockedSongs,
    })
    jest.spyOn(ApiArtist, 'getArtistRelatedArtists').mockResolvedValue({
      entities: mockedArtists,
    })
    jest.spyOn(ApiOwn, 'checkIfOwnFollowsArtist').mockResolvedValue(true)

    const { result } = renderHook(() => useGetArtistDetails(artistId))

    const detailedArtist: DetailedArtist = {
      ...mockedArtist,
      topTracks: mockedSongs,
      relatedArtists: mockedArtists,
      currentUserFollows: true,
    }
    await waitFor(() =>
      expect(result.current.artistInfo).toEqual(detailedArtist),
    )

    act(() => {
      result.current.setArtistInfo(detailedArtist)
    })
    expect(result.current.artistInfo).toBe(detailedArtist)
  })
})
