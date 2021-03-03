import { isLoggedIn, login } from 'api/credentials'

import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { LoginScene } from 'scenes/login/login'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { MediaMenu } from 'components/mediaMenu/mediaMenu'
import { albums } from 'fixtures/albums'
import { mainStyles } from 'styles'

const App = (): JSX.Element => {
  const isUserLoggedIn = isLoggedIn() || login(() => {})
  const GlobalLinkStyle = createGlobalStyle`
    a {
      text-decoration: unset;
    }
  `

  return (
    <ThemeProvider theme={mainStyles}>
      <GlobalLinkStyle />
      {isUserLoggedIn ? <MediaMenu mediaList={albums} /> : <LoginScene />}
    </ThemeProvider>
  )
}

export default App
