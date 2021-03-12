import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { LoginScene } from 'scenes/login/login'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { requestValidToken, hasValidToken, hasAuthCode } from 'api/credentials'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import { useState } from 'react'

const App = (): JSX.Element => {
  const GlobalLinkStyle = createGlobalStyle`
    a {
      text-decoration: unset;
    }
  `

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(hasValidToken())
  const [isLoading, setIsLoading] = useState<boolean>(
    !isLoggedIn && hasAuthCode(),
  )

  if (isLoading) {
    requestValidToken(
      () => {
        setIsLoggedIn(true)
        setIsLoading(false)
      },
      () => {
        setIsLoggedIn(false)
        setIsLoading(false)
      },
    )
  }

  return (
    <ThemeProvider theme={mainStyles}>
      <GlobalLinkStyle />
      {!isLoading && (isLoggedIn ? <SavedAlbums /> : <LoginScene />)}
    </ThemeProvider>
  )
}

export default App
