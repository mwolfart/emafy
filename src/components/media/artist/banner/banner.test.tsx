import { render, screen } from '@testing-library/react'
import { ArtistBanner } from './banner'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { detailedArtist } from 'fixtures/detailedArtist'
import { faker } from '@faker-js/faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('Artist Banner', () => {
  it('renders component and props correctly', () => {
    const subtitle = faker.random.words()
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <ArtistBanner
            artistInfo={detailedArtist}
            setArtistInfo={() => {}}
            subtitle={subtitle}
          />
        </Router>
      </ThemeProvider>,
    )

    const titleElement = screen.getByText(detailedArtist.name)
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })
})
