import { screen, render } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { SavedArtists } from './savedArtists'

describe('Saved Artists', () => {
  it('renders Saved Artists scene correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <SavedArtists />
      </ThemeProvider>,
    )
    const labelSavedElement = screen.getByText(
      strings.scenes.artists.mySavedArtists,
    )
    const labelArtistCntElement = screen.getByText(
      `0 ${strings.scenes.artists.subtextArtists}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelArtistCntElement).toBeTruthy()
  })
})
