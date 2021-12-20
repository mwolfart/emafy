import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LoginScene } from 'scenes/login/login'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import createBrowserHistory from 'history/createBrowserHistory'
import { useEffect, useState } from 'react'
import { ProtectedRoute } from 'components/protectedRoute/protectedRoute'
import { getAuthParamsFromURI } from 'api/credentials'
import { SavedArtists } from 'scenes/savedArtists/savedArtists'
import { SavedSongs } from 'scenes/savedSongs/savedSongs'
import { Sidebar } from 'components/sidebar/sidebar'
import { Topbar } from 'components/topbar/topbar'
import { Profile } from 'scenes/profile/profile'
import { User } from 'types/media'
import { getOwnProfile } from 'api/data'
import { cancellableRequest } from 'api/utils'
import { BeatLoader } from 'components/loader'
import { defaultTheme } from 'theme'

interface IProps {
  isLoggedIn: boolean
}

const GlobalLinkStyle = createGlobalStyle`
a {
  text-decoration: unset;
}
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const HeaderWrapper = styled.div<IProps>`
  ${({ isLoggedIn, theme }) => `
    position: relative;
    width: 100vw;
    ${isLoggedIn && `height: ${theme.topbarHeight};`}
    z-index: 1;
  `}
`

const ContentWrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: calc(100% - ${theme.topbarHeight});
  `}
`

const MainScreen = styled.div<IProps>`
  ${({ isLoggedIn, theme }) => `
    ${isLoggedIn && `padding-left: ${theme.sidebarWidth};`}
    width: ${isLoggedIn ? `calc(100% - ${theme.sidebarWidth})` : `100%`};
    background-color: ${theme.palette.colorBackground};
    height: 100%;
    overflow: hidden;
  `}
`

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const { code, state } = getAuthParamsFromURI()
  const destinationPath = `/login${
    code && state ? `?code=${code}&state=${state}` : ''
  }`

  const history = createBrowserHistory()
  !isLoggedIn && history.push(destinationPath)

  const emptyUser = {
    country: '',
    name: '',
    email: '',
    id: '',
    images: [],
    followerCount: 0,
  }
  const [loggedUser, setLoggedUser] = useState<User>(emptyUser)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    return cancellableRequest(
      getOwnProfile,
      (userData) => {
        setLoggedUser(userData)
        setIsLoading(false)
      },
      () => {},
      () => {
        setIsLoading(false)
      },
    )
  }, [isLoggedIn])

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalLinkStyle />
      <BrowserRouter>
        {isLoading ? (
          <BeatLoader />
        ) : (
          <Wrapper>
            <HeaderWrapper isLoggedIn={isLoggedIn}>
              {isLoggedIn && <Topbar user={loggedUser} />}
            </HeaderWrapper>
            <ContentWrapper>
              {isLoggedIn && <Sidebar />}
              <MainScreen isLoggedIn={isLoggedIn}>
                <Switch>
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    path="/saved-albums"
                    component={SavedAlbums}
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
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    path="/me"
                    component={() => <Profile user={loggedUser} />}
                  />
                  <Route
                    path="/login"
                    component={() => <LoginScene onLogin={setIsLoggedIn} />}
                  />
                </Switch>
              </MainScreen>
            </ContentWrapper>
          </Wrapper>
        )}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
