import { render, screen } from '@testing-library/react'
import { Banner } from './banner'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { album } from 'fixtures/album'
import { renderSubTitle } from '../utils'

describe('Banner', () => {
  it('renders Banner correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Banner mediaInfo={album} />
      </ThemeProvider>,
    )

    const titleElement = screen.getByText(album.name)
    const subtitle = `${renderSubTitle(album)}, ${album.totalTracks} songs`
    const subtitleElement = screen.getByText(subtitle)
    expect(titleElement).toBeInTheDocument()
    expect(subtitleElement).toBeInTheDocument()
  })
})
