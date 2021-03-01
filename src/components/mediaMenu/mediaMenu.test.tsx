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
    albumNames.forEach((query: string): void => {
      const element = screen.getByText(query)
      expect(element).toBeTruthy()
    })

    const artistLists = albumList.map((album: Album) => album.artists)
    artistLists.forEach((list: Media[]) => {
      list.forEach((item: Media) => {
        const element = screen.queryAllByText(item.name)
        expect(element).toBeTruthy()
      })
    })
  })
})
