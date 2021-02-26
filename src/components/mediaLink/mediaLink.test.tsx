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
    let linkElement = screen.getByText(album.name)
    expect(linkElement).toBeTruthy()
    linkElement = screen.getByText(
      `${album.artists[0].name}, ${album.artists[1].name}`,
    )
    expect(linkElement).toBeTruthy()
  })
})
