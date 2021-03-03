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
  })
})
