import { render, screen } from '@testing-library/react'
import { Link } from './link'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Link', () => {
  it('renders Link correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
          <Link mediaInfo={album} />
        </Router>
      </ThemeProvider>,
    )
    const albumNameRegex = new RegExp(album.name)
    const linkElement = screen.getByRole('link', { name: albumNameRegex })
    expect(linkElement).toHaveAttribute('href', '/album/1')
  })
})
