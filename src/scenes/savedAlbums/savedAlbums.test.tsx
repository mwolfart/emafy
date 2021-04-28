import { screen, render } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { SavedAlbums } from './savedAlbums'

describe('Saved Albums', () => {
  it('renders Saved Albums scene correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <SavedAlbums />
      </ThemeProvider>,
    )
    const labelSavedElement = screen.getByText(
      strings.scenes.albums.mySavedAlbums,
    )
    const labelAlbumCntElement = screen.getByText(
      `0 ${strings.scenes.albums.subtextAlbums}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelAlbumCntElement).toBeTruthy()
  })
})
