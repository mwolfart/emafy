import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { LoginScene } from 'scenes/login/login'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { requestValidToken, hasValidToken, hasAuthCode } from 'api/credentials'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import { useEffect, useState } from 'react'

// localhost:3000/authCode=!@#$#@%#@&state=@#$@#%#

const App = (): JSX.Element => {
  const GlobalLinkStyle = createGlobalStyle`
    a {
      text-decoration: unset;
    }
  `

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(hasValidToken())
  const [isOnLoginProcess, setIsOnLoginProcess] = useState<boolean>(
    !isLoggedIn && hasAuthCode(),
  )

  const onSuccessCallback = (): void => {
    setIsLoggedIn(true)
    setIsOnLoginProcess(false)
  }

  const onErrorCallback = (): void => {
    setIsLoggedIn(false)
    setIsOnLoginProcess(false)
  }

  useEffect(() => {
    let cancelled = false
    if (isOnLoginProcess && !cancelled) {
      requestValidToken({ onSuccessCallback, onErrorCallback })
    }
    return () => {
      cancelled = true
    }
  }, [isOnLoginProcess])

  return (
    <ThemeProvider theme={mainStyles}>
      <GlobalLinkStyle />
      {!isOnLoginProcess && (isLoggedIn ? <SavedAlbums /> : <LoginScene />)}
    </ThemeProvider>
  )
}

export default App
