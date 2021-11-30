import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { Sidebar } from './sidebar'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Sidebar', () => {
  it('renders component correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
          <Sidebar />
        </Router>
      </ThemeProvider>,
    )
    const songs = screen.getByText(strings.components.sidebar.songs)
    const albums = screen.getByText(strings.components.sidebar.albums)
    const artists = screen.getByText(strings.components.sidebar.artists)
    const playlists = screen.getByText(strings.components.sidebar.playlists)
    const genres = screen.getByText(strings.components.sidebar.genres)
    expect(songs).toBeInTheDocument()
    expect(albums).toBeInTheDocument()
    expect(artists).toBeInTheDocument()
    expect(playlists).toBeInTheDocument()
    expect(genres).toBeInTheDocument()
  })
})
