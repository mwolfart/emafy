import { screen, render } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { SavedSongs } from './savedSongs'

describe('Saved Songs', () => {
  it('renders Saved Songs scene correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <SavedSongs />
      </ThemeProvider>,
    )
    const labelSavedElement = screen.getByText(
      strings.scenes.songs.mySavedSongs,
    )
    const labelSongCntElement = screen.getByText(
      `0 ${strings.scenes.songs.subtextSongs}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelSongCntElement).toBeTruthy()
  })
})
