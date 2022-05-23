import { artists as mockedArtists } from 'fixtures/artists'
import { useGetUserFollows } from './useGetUserFollows'
import * as ApiOwn from 'api/data/own'
import { faker } from '@faker-js/faker'
import { act, renderHook, waitFor } from '@testing-library/react'

describe('Get User Follows hook', () => {
  test('should init hook correctly', async () => {
    jest.spyOn(ApiOwn, 'getOwnFollowedUsers').mockResolvedValue({
      entities: mockedArtists,
      next: null,
      total: mockedArtists.length,
    })
    jest.spyOn(ApiOwn, 'checkIfOwnFollowsArtist').mockResolvedValue(true)

    const { result } = renderHook(() => useGetUserFollows())
    expect(result.current.isLoading).toBe(true)

    await waitFor(() =>
      expect(result.current.totalCount).toBe(mockedArtists.length),
    )
    expect(result.current.mediaList).toEqual(mockedArtists)
    expect(result.current.nextURL).toBe(null)
    expect(result.current.isLoading).toBe(false)
  })

  test('should fetch more follows', async () => {
    const next = faker.internet.url()
    const artistsHalfLength = mockedArtists.length / 2
    const artistsFirstHalf = mockedArtists.slice(0, artistsHalfLength)
    const artistsSecondHalf = mockedArtists.slice(artistsHalfLength)

    jest.spyOn(ApiOwn, 'getOwnFollowedUsers').mockImplementation((nextURL) =>
      Promise.resolve({
        entities: nextURL ? artistsSecondHalf : artistsFirstHalf,
        next: nextURL ? null : next,
        total: mockedArtists.length,
      }),
    )
    jest.spyOn(ApiOwn, 'checkIfOwnFollowsArtist').mockResolvedValue(true)

    const { result } = renderHook(() => useGetUserFollows())

    await waitFor(() =>
      expect(result.current.totalCount).toBe(mockedArtists.length),
    )
    expect(result.current.mediaList).toEqual(artistsFirstHalf)
    expect(result.current.nextURL).toBe(next)
    expect(result.current.isLoading).toBe(false)

    await act(async () => {
      await result.current.fetchMoreMedia()
    })

    expect(result.current.nextURL).toEqual(null)
    expect(result.current.mediaList).toStrictEqual(mockedArtists)
  })
})
