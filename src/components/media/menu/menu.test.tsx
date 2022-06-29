import { render, screen } from '@testing-library/react'
import { albums } from 'fixtures/albums'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Router } from 'react-router-dom'
import { MediaMenu } from './menu'
import { strings } from 'strings'
import { createMemoryHistory } from 'history'

describe('Media Menu', () => {
  it('renders component and props correctly', () => {
    const albumList = albums
    const history = createMemoryHistory()

    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <MediaMenu
            fetchMoreMedia={() => {}}
            mediaList={albumList}
            nextURL={null}
            totalCount={albumList.length}
          />
        </Router>
      </ThemeProvider>,
    )

    const toggleElement = screen.getByRole('checkbox', {
      name: strings.ui.toggleView,
    })
    expect(toggleElement).toBeInTheDocument()

    albumList.map((album) => {
      const element = screen.getByText(album.name)
      expect(element).toBeInTheDocument()
    })
  })
})
