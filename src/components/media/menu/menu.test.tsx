import { render, screen } from '@testing-library/react'

import { Menu } from './menu'
import { albums } from 'fixtures/albums'
import { Album, Media } from 'types/media'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Menu', () => {
  it('renders Menu correctly', () => {
    const albumList = albums

    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
          <Menu mediaList={albumList} />
        </Router>
      </ThemeProvider>,
    )

    const albumNames = albumList.map((album: Album) => album.name)
    albumNames.forEach((query: string): void => {
      const element = screen.getByText(query)
      expect(element).toBeInTheDocument()
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
