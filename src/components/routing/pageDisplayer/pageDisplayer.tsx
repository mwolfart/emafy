import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { LoginScene } from 'scenes/login/login'
import { MyPlaylists } from 'scenes/myPlaylists/myPlaylists'
import { Profile } from 'scenes/profile/profile'
import { SavedAlbums } from 'scenes/savedAlbums/savedAlbums'
import { SavedArtists } from 'scenes/savedArtists/savedArtists'
import { SavedSongs } from 'scenes/savedSongs/savedSongs'
import { ViewArtist } from 'scenes/viewArtist/viewArtist'
import styled from 'styled-components'
import { User } from 'types/media'

interface Props {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  loggedUser: User
}

interface StyledProps {
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

export const PageDisplayer: FC<Props> = ({
  isLoggedIn,
  setIsLoggedIn,
  loggedUser,
}) => {
  const redirect = <Navigate to="/login" />
  return (
    <Wrapper isLoggedIn={isLoggedIn}>
      <Routes>
        <Route
          path="/saved-albums"
          element={isLoggedIn ? <SavedAlbums /> : redirect}
        />
        <Route
          path="/saved-artists"
          element={isLoggedIn ? <SavedArtists /> : redirect}
        />
        <Route
          path="/saved-songs"
          element={isLoggedIn ? <SavedSongs /> : redirect}
        />
        <Route
          path="/my-playlists"
          element={isLoggedIn ? <MyPlaylists /> : redirect}
        />
        <Route
          path="/me"
          element={isLoggedIn ? <Profile user={loggedUser} /> : redirect}
        />
        <Route
          path="/artist/:id"
          element={isLoggedIn ? <ViewArtist /> : redirect}
        />
        <Route path="/login" element={<LoginScene onLogin={setIsLoggedIn} />} />
      </Routes>
    </Wrapper>
  )
}
