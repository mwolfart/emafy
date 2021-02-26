import { render, screen } from '@testing-library/react'

import { MediaMenu } from './mediaMenu'
import { albums } from 'fixtures/albums'
import { Album, Media } from 'types/media'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

describe('MediaMenu', () => {
  it('renders MediaMenu correctly', () => {
    const albumList = albums

    render(
      <ThemeProvider theme={mainStyles}>
        <MediaMenu mediaList={albumList} />
      </ThemeProvider>,
    )

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
      const element = screen.getByText(query)
      expect(element).toBeTruthy()
    })

    artistNames.forEach((query: string): void => {
      const element = screen.getByText(query)
      expect(element).toBeTruthy()
    })
  })
})
