import { act, renderHook } from '@testing-library/react-hooks'
import { artists as mockedArtists } from 'fixtures/artists'
import { useGetUserFollows } from './useGetUserFollows'
import * as Api from 'api/data'
import faker from 'faker'

test('should init hook correctly', async () => {
  jest.spyOn(Api, 'getOwnFollowedUsers').mockResolvedValue({
    entities: mockedArtists,
    next: null,
    total: mockedArtists.length,
  })
  jest.spyOn(Api, 'checkIfOwnFollowsArtist').mockResolvedValue(true)

  const { result } = renderHook(() => useGetUserFollows())
  expect(result.current.isLoading).toBe(true)

  await act(() => new Promise(setImmediate))

  expect(result.current.followList).toEqual(mockedArtists)
  expect(result.current.totalCount).toBe(mockedArtists.length)
  expect(result.current.nextURL).toBe(null)
  expect(result.current.isLoading).toBe(false)
})

test('should fetch more follows', async () => {
  const next = faker.internet.url()
  const artistsHalfLength = mockedArtists.length / 2
  const artistsFirstHalf = mockedArtists.slice(0, artistsHalfLength)
  const artistsSecondHalf = mockedArtists.slice(artistsHalfLength)

  jest.spyOn(Api, 'getOwnFollowedUsers').mockImplementation((nextURL) =>
    Promise.resolve({
      entities: nextURL ? artistsSecondHalf : artistsFirstHalf,
      next: nextURL ? null : next,
      total: mockedArtists.length,
    }),
  )
  jest.spyOn(Api, 'checkIfOwnFollowsArtist').mockResolvedValue(true)

  const { result } = renderHook(() => useGetUserFollows())
  await act(() => new Promise(setImmediate))

  expect(result.current.followList).toEqual(artistsFirstHalf)
  expect(result.current.totalCount).toBe(mockedArtists.length)
  expect(result.current.nextURL).toBe(next)
  expect(result.current.isLoading).toBe(false)

  await act(async () => {
    await result.current.fetchMoreFollows()
  })

  expect(result.current.followList).toEqual(mockedArtists)
  expect(result.current.nextURL).toBe(null)
})
