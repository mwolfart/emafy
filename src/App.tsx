import { isLoggedIn, login } from 'api/credentials'

import './App.css'
import { mainTheme } from 'themes'
import { LoginScene } from 'scenes/login/login'
import { ThemeProvider } from 'styled-components'
import { MediaGridMenu } from 'components/mediaGridMenu/mediaGridMenu'
import { albums } from 'fixtures/albums'

const App = (): JSX.Element => {
  const isUserLoggedIn = isLoggedIn() || login(() => {})

  return (
    <ThemeProvider theme={mainTheme}>
      {isUserLoggedIn ? <MediaGridMenu mediaList={albums} /> : <LoginScene />}
    </ThemeProvider>
  )
}

export default App
