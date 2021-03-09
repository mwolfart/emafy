import { screen, render } from '@testing-library/react'
import { albums } from 'fixtures/albums'
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
      `${albums.length} ${strings.scenes.albums.subtextAlbums}`,
    )
    const labelGridElement = screen.getByText(strings.scenes.albums.grid)
    const labelListElement = screen.getByText(strings.scenes.albums.list)
    expect(labelSavedElement).toBeTruthy()
    expect(labelAlbumCntElement).toBeTruthy()
    expect(labelGridElement).toBeTruthy()
    expect(labelListElement).toBeTruthy()
  })
})
