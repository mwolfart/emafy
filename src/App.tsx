import { isLoggedIn, login } from 'api/credentials'
import React from 'react'
import './App.css'
import { LoginScene } from './scenes/login/login'

const App = (): JSX.Element => {
  const isUserLoggedIn = isLoggedIn() || login(() => {})
  return isUserLoggedIn ? <div>You are logged in</div> : <LoginScene />
}

export default App
