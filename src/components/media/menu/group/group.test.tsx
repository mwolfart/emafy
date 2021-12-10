import { render, screen } from '@testing-library/react'
import { Group } from './group'
import { albums } from 'fixtures/albums'
import { Album, Media } from 'types/media'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter as Router } from 'react-router-dom'

describe('MediaGroup', () => {
  it('renders Group correctly', () => {
    const albumList = albums

    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Group mediaList={albumList} />
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
