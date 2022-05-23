import { act, renderHook, waitFor } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { albums } from 'fixtures/albums'
import { useGetMediaList } from './useGetMediaList'

describe('Get Media List hook', () => {
  test('should init hook correctly', async () => {
    const next = faker.internet.url()
    const getFunction = jest.fn((nextURL) =>
      Promise.resolve({
        entities: albums,
        next: next,
        total: albums.length,
      }),
    )

    const { result } = renderHook(() => useGetMediaList(getFunction))

    await waitFor(() => expect(result.current.totalCount).toBe(albums.length))
    expect(result.current.mediaList).toBe(albums)
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

    const { result } = renderHook(() => useGetMediaList(getFunction))

    await waitFor(() => expect(result.current.totalCount).toBe(albums.length))
    expect(result.current.mediaList).toEqual(albums.slice(0, albumsHalf))

    await act(async () => {
      await result.current.fetchMoreMedia()
    })

    expect(result.current.nextURL).toEqual(null)
    expect(result.current.mediaList).toEqual(albums)
  })
})
