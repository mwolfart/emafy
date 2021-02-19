import { isLoggedIn, login } from 'api/credentials'
import React from 'react'
import './App.css'
import { mainTheme } from 'themes'
import { LoginScene } from 'scenes/login/login'
import { ThemeProvider } from 'styled-components'
import { Album } from 'types/media'
import { MediaGridMenu } from 'scenes/login/mediaGridMenu'

const App = (): JSX.Element => {
  const isUserLoggedIn = isLoggedIn() || login(() => {})

  const albumA: Album = {
    id: '01',
    name: 'Oceans',
    artists: [
      { id: '02', name: 'Foo' },
      { id: '03', name: 'Bar' },
    ],
    totalTracks: 10,
  }

  const albumB: Album = {
    id: '02',
    name: 'Volcanos',
    artists: [
      { id: '02', name: 'Foo' },
      { id: '03', name: 'Bar' },
    ],
    totalTracks: 10,
  }

  const albumC: Album = {
    id: '03',
    name: 'Earthquake',
    artists: [{ id: '02', name: 'Foo' }],
    totalTracks: 10,
  }

  const albumD: Album = {
    id: '01',
    name: 'Carrot',
    artists: [{ id: '05', name: 'Gee' }],
    totalTracks: 10,
  }

  const albumList: Album[] = [
    albumA,
    albumB,
    albumC,
    albumD,
    albumD,
    albumD,
    albumD,
    albumD,
    albumD,
  ]

  return (
    <ThemeProvider theme={mainTheme}>
      {isUserLoggedIn ? (
        <MediaGridMenu mediaList={albumList} />
      ) : (
        <LoginScene />
      )}
    </ThemeProvider>
  )
}

export default App
