import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { Sidebar } from './sidebar'
import { ThemeProvider } from 'styled-components'
import { createMemoryHistory } from 'history'
import { defaultTheme } from 'theme'
import { Router } from 'react-router-dom'

describe('Sidebar', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
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
