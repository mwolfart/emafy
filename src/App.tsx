import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LoginScene } from 'scenes/login/login'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import createBrowserHistory from 'history/createBrowserHistory'
import { useState } from 'react'
import { ProtectedRoute } from 'components/protectedRoute/protectedRoute'
import { getAuthParamsFromURI } from 'api/credentials'
import { ViewAlbumLoader } from 'scenes/loader/viewAlbumLoader'
import { SavedArtists } from 'scenes/savedArtists/savedArtists'
import { SavedSongs } from 'scenes/savedSongs/savedSongs'
import { Sidebar } from 'components/sidebar/sidebar'
import { Topbar } from 'components/topbar/topbar'
import { GlobalProps } from 'types/global'

const App = (): JSX.Element => {
  const GlobalLinkStyle = createGlobalStyle`
    a {
      text-decoration: unset;
    }
  `
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
  `

  const HeaderWrapper = styled.div`
    ${({ theme = mainStyles }: GlobalProps) => `
      position: relative;
      width: 100vw;
      ${isLoggedIn && `height: ${theme.topbarHeight};`}
      z-index: 1;
    `}
  `

  const ContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: 100%;
  `

  const MainScreen = styled.div`
    ${({ theme = mainStyles }: GlobalProps) => `
      ${isLoggedIn && `padding-left: ${theme.sidebarWidth};`}
      width: ${isLoggedIn ? `calc(100% - ${theme.sidebarWidth})` : `100%`};
      background-color: ${theme.palette.colorBackground};
    `}
  `

  const { code, state } = getAuthParamsFromURI()
  const destinationPath = `/login${
    code && state ? `?code=${code}&state=${state}` : ''
  }`

  const history = createBrowserHistory()
  !isLoggedIn && history.push(destinationPath)

  return (
    <ThemeProvider theme={mainStyles}>
      <GlobalLinkStyle />
      <BrowserRouter>
        <Wrapper>
          <HeaderWrapper>{isLoggedIn && <Topbar />}</HeaderWrapper>
          <ContentWrapper>
            {isLoggedIn && <Sidebar />}
            <MainScreen>
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
            </MainScreen>
          </ContentWrapper>
        </Wrapper>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
