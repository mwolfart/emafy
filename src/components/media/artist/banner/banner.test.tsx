import { render, screen } from '@testing-library/react'
import { ArtistBanner } from './banner'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { detailedArtist } from 'fixtures/detailedArtist'
import faker from 'faker'
import { StaticRouter } from 'react-router'

describe('Artist Banner', () => {
  it('renders component and props correctly', () => {
    const subtitle = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <StaticRouter>
          <ArtistBanner
            artistInfo={detailedArtist}
            setArtistInfo={() => {}}
            subtitle={subtitle}
          />
        </StaticRouter>
      </ThemeProvider>,
    )

    const titleElement = screen.getByText(detailedArtist.name)
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })
})
