import { render, screen } from '@testing-library/react'
import { artist } from 'fixtures/artist'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { MediaMenuItem } from './item'

describe('Media Menu Item', () => {
  it('renders component and props correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <MediaMenuItem mediaInfo={artist} />
        </Router>
      </ThemeProvider>,
    )
    const artistNameRegex = new RegExp(artist.name)
    const linkElement = screen.getByRole('link', { name: artistNameRegex })
    expect(linkElement).toBeInTheDocument()
  })
})
