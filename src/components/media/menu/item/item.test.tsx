import { render, screen } from '@testing-library/react'
import { Item } from './item'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Item', () => {
  it('renders Item correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
          <Item mediaInfo={album} />
        </Router>
      </ThemeProvider>,
    )
    const albumNameRegex = new RegExp(album.name)
    const linkElement = screen.getByRole('link', { name: albumNameRegex })
    expect(linkElement).toHaveAttribute('href', '/album/1')
  })
})
