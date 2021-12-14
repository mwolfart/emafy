import { render, screen } from '@testing-library/react'
import { Description } from './description'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'

describe('Description', () => {
  it('renders Description correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Description mediaInfo={album} />
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
