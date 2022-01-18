import { act, renderHook } from '@testing-library/react-hooks'
import faker from 'faker'
import { albums } from 'fixtures/albums'
import { useGetSavedMedia } from './useGetSavedMedia'

test('should init hook correctly', async () => {
  const next = faker.internet.url()
  const getFunction = jest.fn((nextURL) =>
    Promise.resolve({
      entities: albums,
      next: next,
      total: albums.length,
    }),
  )

  const { result } = renderHook(() => useGetSavedMedia(getFunction))
  await act(() => new Promise(setImmediate))

  expect(result.current.mediaList).toBe(albums)
  expect(result.current.totalCount).toBe(albums.length)
  expect(result.current.nextURL).toBe(next)
})

test('should fetch more media', async () => {
  const next = faker.internet.url()
  const albumsHalf = albums.length / 2
  const getFunction = jest.fn((nextURL) =>
    Promise.resolve({
      entities: nextURL
        ? albums.slice(albumsHalf)
        : albums.slice(0, albumsHalf),
      next: nextURL ? null : next,
      total: albums.length,
    }),
  )

  const { result } = renderHook(() => useGetSavedMedia(getFunction))
  await act(() => new Promise(setImmediate))

  expect(result.current.totalCount).toBe(albums.length)
  expect(result.current.mediaList).toEqual(albums.slice(0, albumsHalf))

  await act(async () => {
    await result.current.fetchMoreMedia()
  })

  expect(result.current.mediaList).toEqual(albums)
  expect(result.current.nextURL).toBe(null)
})
