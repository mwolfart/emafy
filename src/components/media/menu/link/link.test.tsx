import { fireEvent, render, screen } from '@testing-library/react'
import { Link } from './link'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { BrowserRouter as Router } from 'react-router-dom'
import { artist } from 'fixtures/artist'

describe('Media Link', () => {
  it('renders component and artist props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Link mediaInfo={artist} />
        </Router>
      </ThemeProvider>,
    )
    const artistNameRegex = new RegExp(artist.name)
    const linkElement = screen.getByRole('link', { name: artistNameRegex })
    expect(linkElement).toBeInTheDocument()
  })

  it('renders component and album props correctly', () => {
    const extraProps = {
      mediaSnippetOpenCallback: jest.fn(),
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Link mediaInfo={album} extraProps={extraProps} />
        </Router>
      </ThemeProvider>,
    )
    const albumNameRegex = new RegExp(album.name)
    const linkElement = screen.getByText(albumNameRegex)
    expect(linkElement).toBeInTheDocument()

    fireEvent.click(linkElement)
    expect(extraProps.mediaSnippetOpenCallback).toHaveBeenCalled()
  })
})
