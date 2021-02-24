import { render } from '@testing-library/react'

import { MediaGridMenu } from './mediaGridMenu'
import { albums } from 'fixtures/albums'
import { Album, Media } from 'types/media'

describe('MediaGridMenu', () => {
  it('renders MediaGridMenu correctly', () => {
    const albumList = albums

    const { getByText } = render(<MediaGridMenu mediaList={albumList} />)

    const albumNames = albumList.map((album: Album) => album.name)

    const artistNameReduction = (
      fullString: string,
      curArtistName: string,
    ): string => `${fullString}, ${curArtistName}`
    const artistListToString = (artistList: Media[]): string =>
      artistList.map((artist: Media) => artist.name).reduce(artistNameReduction)
    const artistNames = albumList
      .map((album: Album) => album.artists)
      .map(artistListToString)

    albumNames.forEach((query: string): void => {
      const element = getByText(query)
      expect(element).toBeTruthy()
    })

    artistNames.forEach((query: string): void => {
      const element = getByText(query)
      expect(element).toBeTruthy()
    })
  })
})
