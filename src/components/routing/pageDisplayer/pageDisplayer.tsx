import { VFC } from 'react'
import { Switch, Route } from 'react-router'
import { LoginScene } from 'scenes/login/login'
import { MyPlaylists } from 'scenes/myPlaylists/myPlaylists'
import { Profile } from 'scenes/profile/profile'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import { SavedArtists } from 'scenes/savedArtists/savedArtists'
import { SavedSongs } from 'scenes/savedSongs/savedSongs'
import { ViewArtist } from 'scenes/viewArtist/viewArtist'
import styled from 'styled-components'
import { User } from 'types/media'
import { ProtectedRoute } from '../protectedRoute/protectedRoute'

type Props = {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  loggedUser: User
}

type StyledProps = {
  isLoggedIn: boolean
}

const Wrapper = styled.div<StyledProps>`
  ${({ isLoggedIn, theme }) => `
    ${isLoggedIn && `padding-left: ${theme.sidebarWidth};`}
    width: ${isLoggedIn ? `calc(100% - ${theme.sidebarWidth})` : `100%`};
    background-color: ${theme.palette.colorBackground};
    overflow: hidden;

    @media (max-width: 576px) {
      padding-left: 0;
      width: 100%;
    }
  `}
`

export const PageDisplayer: VFC<Props> = ({
  isLoggedIn,
  setIsLoggedIn,
  loggedUser,
}) => {
  return (
    <Wrapper isLoggedIn={isLoggedIn}>
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
          path="/my-playlists"
          component={MyPlaylists}
        />
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          path="/me"
          component={() => <Profile user={loggedUser} />}
        />
        <ProtectedRoute
          isLoggedIn={isLoggedIn}
          path="/artist/:id"
          component={ViewArtist}
        />
        <Route
          path="/login"
          component={() => <LoginScene onLogin={setIsLoggedIn} />}
        />
      </Switch>
    </Wrapper>
  )
}
