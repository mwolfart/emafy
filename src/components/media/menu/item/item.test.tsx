import { render, screen } from '@testing-library/react'
import { artist } from 'fixtures/artist'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter as Router } from 'react-router-dom'
import { Item } from './item'

describe('Item', () => {
  it('should render correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Item mediaInfo={artist} />
        </Router>
      </ThemeProvider>,
    )
    const artistNameRegex = new RegExp(artist.name)
    const linkElement = screen.getByRole('link', { name: artistNameRegex })
    expect(linkElement).toBeInTheDocument()
  })
})
