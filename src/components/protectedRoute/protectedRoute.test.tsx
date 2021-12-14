import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { Router } from 'react-router-dom'
import { ProtectedRoute } from './protectedRoute'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import { createMemoryHistory } from 'history'
import { strings } from 'strings'

describe('ProtectedRoute', () => {
  it('redirects to login page correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={mainStyles}>
        <Router history={history}>
          <ProtectedRoute
            isLoggedIn={false}
            path="/saved-albums"
            component={SavedAlbums}
          />
        </Router>
      </ThemeProvider>,
    )
    expect(history.location.pathname).toEqual('/login')
  })

  it('renders selected page correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={mainStyles}>
        <Router history={history}>
          <ProtectedRoute
            isLoggedIn={true}
            path="/saved-albums"
            component={SavedAlbums}
          />
        </Router>
      </ThemeProvider>,
    )
    history.push('/saved-albums')
    const labelSavedElement = screen.getByText(
      strings.scenes.albums.mySavedAlbums,
    )
    expect(labelSavedElement).toBeTruthy()
  })
})
