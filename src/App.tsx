import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginScene } from 'scenes/login/login'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import createBrowserHistory from 'history/createBrowserHistory'
import { useState } from 'react'
import { ProtectedRoute } from 'components/protectedRoute/protectedRoute'
import { getAuthParamsFromURI } from 'api/credentials'
import { ViewAlbumLoader } from 'scenes/loader/viewAlbumLoader'
import { SavedArtists } from 'scenes/savedArtists/savedArtists'
import { SavedSongs } from 'scenes/savedSongs/savedSongs'

const App = (): JSX.Element => {
  const GlobalLinkStyle = createGlobalStyle`
    a {
      text-decoration: unset;
    }
  `

  const history = createBrowserHistory()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { code, state } = getAuthParamsFromURI()

  const destinationPath = `/login${
    code && state ? `?code=${code}&state=${state}` : ''
  }`
  !isLoggedIn && history.push(destinationPath)

  return (
    <ThemeProvider theme={mainStyles}>
      <GlobalLinkStyle />
      <Router>
        <Switch>
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/saved-albums"
            component={SavedAlbums}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/album/:id"
            component={ViewAlbumLoader}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/saved-artists"
            component={SavedArtists}
          />
          <ProtectedRoute
            isLoggedIn={isLoggedIn}
            path="/saved-songs"
            component={SavedSongs}
          />
          <Route
            path="/login"
            component={() => <LoginScene onLogin={setIsLoggedIn} />}
          />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
