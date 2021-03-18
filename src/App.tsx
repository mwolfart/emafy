import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { LoginScene } from 'scenes/login/login'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import createBrowserHistory from 'history/createBrowserHistory'

const App = (): JSX.Element => {
  const GlobalLinkStyle = createGlobalStyle`
    a {
      text-decoration: unset;
    }
  `

  const history = createBrowserHistory()
  history.push('/login')

  return (
    <ThemeProvider theme={mainStyles}>
      <GlobalLinkStyle />
      <Router>
        <Switch>
          <Route path="/saved-albums" component={SavedAlbums} />
          <Route path="/login" component={LoginScene} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App
