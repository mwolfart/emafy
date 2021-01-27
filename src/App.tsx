import { login } from 'api/credentials'
import React from 'react'
import './App.css'
import { LoginScene } from './scenes/login/login'

const App: () => JSX.Element = () => {
  const loggedIn = login(() => {})
  return loggedIn ? <div>adasd</div> : <LoginScene />
}

export default App
