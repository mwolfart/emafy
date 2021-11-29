import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { Sidebar } from './sidebar'

describe('Sidebar', () => {
  it('renders component correctly', () => {
    render(<Sidebar />)
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
