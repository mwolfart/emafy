import './App.css'
import '@fortawesome/fontawesome-free/css/fontawesome.min.css'
import '@fortawesome/fontawesome-free/css/solid.min.css'
import { BrowserRouter } from 'react-router-dom'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { createBrowserHistory } from 'history'
import { useEffect, useState } from 'react'
import { getAuthParamsFromURI } from 'api/credentials'
import { Sidebar } from 'components/navigation/sidebar/sidebar'
import { Topbar } from 'components/navigation/topbar/topbar'
import { User } from 'types/media'
import { BeatLoader } from 'components/loader'
import { defaultTheme } from 'theme'
import { getOwnProfile } from 'api/data/own'
import { PageDisplayer } from 'components/routing/pageDisplayer/pageDisplayer'
import { emptyUser } from 'utils/constants'
import { PlayerComponent } from 'components/player/player'
import { PlayerContext } from 'contexts/player'
import { UserContext, UserContextProps, UserPreferences } from 'contexts/user'

interface StyledProps {
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

const HeaderWrapper = styled.div<StyledProps>`
  ${({ isLoggedIn, theme }) => `
    position: relative;
    width: 100vw;
    ${isLoggedIn && `height: ${theme.topbarHeightMobile};`}
    z-index: 1;

    @media (min-width: 576px) {
      ${isLoggedIn && `height: ${theme.topbarHeight};`}
    }
  `}
`

const ContentWrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: calc(100% - ${theme.topbarHeightMobile} - ${theme.playerHeightMobile});

    @media (min-width: 576px) {
      height: calc(100% - ${theme.topbarHeight} - ${theme.playerHeight});
    }
  `}
`

const FooterWrapper = styled.div`
  position: relative;
  width: 100vw;
  z-index: 2;
`

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loggedUser, setLoggedUser] = useState<User>(emptyUser)
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'light',
    language: 'en',
    font: 'classic',
  })
  const { code, state } = getAuthParamsFromURI()
  const destinationPath = `${process.env.REACT_APP_BASE_ROUTER_URL}/login${
    code && state ? `?code=${code}&state=${state}` : ''
  }`
  const history = createBrowserHistory()
  !isLoggedIn && history.push(destinationPath)

  const initialUserContext: UserContextProps = {
    user: loggedUser,
    preferences,
    setPreferences,
  }
  const initialPlayerContext = {
    playMedia: () => {},
    playSong: () => {},
    playAlbum: () => {},
    playArtist: () => {},
    playPlaylist: () => {},
  }

  useEffect(() => {
    let aborted = false
    getOwnProfile()
      .then((userData) => {
        if (!aborted) {
          setLoggedUser(userData)
          setIsLoading(false)
        }
      })
      .catch(() => false)
      .finally(() => !aborted && setIsLoading(false))
    return () => {
      aborted = true
    }
  }, [isLoggedIn])

  return (
    <ThemeProvider theme={defaultTheme}>
      <UserContext.Provider value={initialUserContext}>
        <PlayerContext.Provider value={initialPlayerContext}>
          <GlobalLinkStyle />
          <BrowserRouter basename={process.env.REACT_APP_BASE_ROUTER_URL}>
            {isLoading ? (
              <BeatLoader />
            ) : (
              <Wrapper>
                <HeaderWrapper isLoggedIn={isLoggedIn}>
                  {isLoggedIn && <Topbar />}
                </HeaderWrapper>
                <ContentWrapper>
                  {isLoggedIn && <Sidebar />}
                  <PageDisplayer
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </ContentWrapper>
                <FooterWrapper>
                  {isLoggedIn && <PlayerComponent />}
                </FooterWrapper>
              </Wrapper>
            )}
          </BrowserRouter>
        </PlayerContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  )
}

export default App
