import { render, screen } from '@testing-library/react'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { RelatedArtists } from './relatedArtists'
import { artists } from 'fixtures/artists'
import { StaticRouter as Router } from 'react-router-dom'

describe('Related Artists', () => {
  it('renders component and props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <RelatedArtists artistList={artists} />
        </Router>
      </ThemeProvider>,
    )

    const elements = screen.getAllByRole('link')
    const hrefs = elements.map((el) => el.getAttribute('href'))
    hrefs.map((href, idx) => {
      const url = `/artist/${artists[idx].id}`
      expect(url).toEqual(href)
    })
  })
})
