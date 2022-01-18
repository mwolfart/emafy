import { render, screen } from '@testing-library/react'
import { ArtistBanner } from './banner'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { renderSubTitle } from 'utils/utils'

describe('Artist Banner', () => {
  it('renders component and props correctly', () => {
    const subtitle = `${renderSubTitle(album)}, ${album.totalTracks} songs`
    render(
      <ThemeProvider theme={defaultTheme}>
        <ArtistBanner
          mediaInfo={album}
          subtitle={subtitle}
          relatedArtists={[]}
        />
      </ThemeProvider>,
    )

    const titleElement = screen.getByText(album.name)
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })
})
