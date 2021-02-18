import { isLoggedIn, login } from 'api/credentials'
import React from 'react'
import './App.css'
import { mainTheme } from 'themes'
import { LoginScene } from 'scenes/login/login'
import { ThemeProvider } from 'styled-components'

const App = (): JSX.Element => {
  const isUserLoggedIn = isLoggedIn() || login(() => {})
  return (
    <ThemeProvider theme={mainTheme}>
      {isUserLoggedIn ? <div>You are logged in</div> : <LoginScene />}
    </ThemeProvider>
  )
}

export default App
