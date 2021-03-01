import { render, screen } from '@testing-library/react'

import { MediaLink } from './mediaLink'
import { album } from 'fixtures/album'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'

describe('MediaLink', () => {
  it('renders MediaLink correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <MediaLink mediaInfo={album} />
      </ThemeProvider>,
    )
    const albumNameRegex = new RegExp(album.name)
    const linkElement = screen.getByRole('link', { name: albumNameRegex })
    expect(linkElement).toHaveAttribute('href', '')

    const headingElement = screen.getAllByRole('heading', { name: album.name })
    expect(headingElement.length).toBeGreaterThan(0)

    const artistNames = `${album.artists[0].name}, ${album.artists[1].name}`
    const headingElementArtists = screen.getAllByRole('heading', {
      name: artistNames,
    })
    expect(headingElementArtists.length).toBeGreaterThan(0)
  })
})
