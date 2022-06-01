import { defaultTheme } from 'theme'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { QueueTrack } from './queueTrack'
import { faker } from '@faker-js/faker'
import { abbreviateText } from 'utils/utils'

describe('Queue Track', () => {
  it('renders component correctly', () => {
    const title = faker.random.words()
    const artists = [faker.name.findName()]
    render(
      <ThemeProvider theme={defaultTheme}>
        <QueueTrack title={title} artists={artists} />
      </ThemeProvider>,
    )

    const titleElement = screen.getByText(abbreviateText(title, 50))
    const artistElement = screen.getByText(abbreviateText(artists[0], 50))
    expect(titleElement).toBeInTheDocument()
    expect(artistElement).toBeInTheDocument()
  })
})
