import { render, screen } from '@testing-library/react'
import { MediaDescription } from './description'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'

describe('Media Description', () => {
  it('renders component and props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <MediaDescription mediaInfo={album} rowVariant={true} />
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
