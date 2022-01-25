import { act, renderHook } from '@testing-library/react-hooks'
import faker from 'faker'
import { useGetArtistDetails } from './useGetArtistDetails'
import * as Api from 'api/data'
import { artist as mockedArtist } from 'fixtures/artist'
import { songs as mockedSongs } from 'fixtures/songs'
import { artists as mockedArtists } from 'fixtures/artists'
import { DetailedArtist } from 'types/media'

describe('Get Artist Details hook', () => {
  test('should init hook correctly', async () => {
    const artistId = faker.random.word()

    jest.spyOn(Api, 'getArtist').mockResolvedValue({
      entities: mockedArtist,
    })
    jest.spyOn(Api, 'getArtistTopTracks').mockResolvedValue({
      entities: mockedSongs,
    })
    jest.spyOn(Api, 'getArtistRelatedArtists').mockResolvedValue({
      entities: mockedArtists,
    })
    jest.spyOn(Api, 'checkIfOwnFollowsArtist').mockResolvedValue(true)

    const { result } = renderHook(() => useGetArtistDetails(artistId))
    await act(() => new Promise(setImmediate))

    let detailedArtist: DetailedArtist = {
      ...mockedArtist,
      topTracks: mockedSongs,
      relatedArtists: mockedArtists,
      currentUserFollows: true,
    }
    expect(result.current.artistInfo).toEqual(detailedArtist)

    act(() => {
      result.current.setArtistInfo(detailedArtist)
    })
    expect(result.current.artistInfo).toBe(detailedArtist)
  })
})
