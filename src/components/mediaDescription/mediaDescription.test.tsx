import { render, screen } from '@testing-library/react'

import { MediaDescription } from './mediaDescription'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'

describe('MediaDescription', () => {
  it('renders MediaDescription correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <MediaDescription mediaInfo={album} />
      </ThemeProvider>,
    )

    const headingElement = screen.getAllByRole('heading', { name: album.name })
    expect(headingElement.length).toBeGreaterThan(0)

    const artistNames = `${album.artists[0].name}, ${album.artists[1].name}`
    const headingElementArtists = screen.getAllByRole('heading', {
      name: artistNames,
    })
    expect(headingElementArtists.length).toBeGreaterThan(0)
  })
})
