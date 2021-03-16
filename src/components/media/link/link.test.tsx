import { render, screen } from '@testing-library/react'

import { Link } from './link'
import { album } from 'fixtures/album'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'

describe('Link', () => {
  it('renders Link correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Link mediaInfo={album} />
      </ThemeProvider>,
    )
    const albumNameRegex = new RegExp(album.name)
    const linkElement = screen.getByRole('link', { name: albumNameRegex })
    expect(linkElement).toHaveAttribute('href', '')
  })
})
