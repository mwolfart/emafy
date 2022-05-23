import { render, screen } from '@testing-library/react'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { createMemoryHistory } from 'history'
import { RelatedArtists } from './relatedArtists'
import { artists } from 'fixtures/artists'
import { Router } from 'react-router-dom'

describe('Related Artists', () => {
  it('renders component and props correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <RelatedArtists artistList={artists} />
        </Router>
      </ThemeProvider>,
    )

    const elements = screen.getAllByRole('link')
    const hrefs = elements.map((el) => el.getAttribute('href'))
    hrefs.forEach((href, idx) => {
      const url = `/artist/${artists[idx].id}`
      expect(url).toEqual(href)
    })
  })
})
