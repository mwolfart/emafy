import { getFeaturedPlaylists, getNewReleases } from 'api/data/browse'
import {
  getOwnFollowedUsers,
  getOwnPlaylists,
  getOwnSavedAlbums,
  getOwnSavedSongs,
} from 'api/data/own'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Discover } from 'scenes/discover/discover'
import { LoginScene } from 'scenes/login/login'
import { MediaPage } from 'scenes/mediaPage/mediaPage'
import { MediaSearchPage } from 'scenes/mediaSearchPage/mediaSearchPage'
import { Search } from 'scenes/search/search'
import { ViewArtist } from 'scenes/viewArtist/viewArtist'
import { strings } from 'strings'
import styled from 'styled-components'

interface Props {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
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

export const PageDisplayer: FC<Props> = ({ isLoggedIn, setIsLoggedIn }) => {
  const redirect = <Navigate to="/login" />
  const savedAlbums = (
    <MediaPage
      fetchFn={getOwnSavedAlbums}
      title={strings.pages.savedAlbums}
      subtext={strings.ui.xAlbums}
    />
  )
  const savedTracks = (
    <MediaPage
      fetchFn={getOwnSavedSongs}
      title={strings.pages.savedTracks}
      subtext={strings.ui.xTracks}
    />
  )
  const savedArtists = (
    <MediaPage
      fetchFn={getOwnFollowedUsers}
      title={strings.pages.followedArtists}
      subtext={strings.ui.xArtists}
    />
  )
  const savedPlaylists = (
    <MediaPage
      fetchFn={getOwnPlaylists}
      title={strings.pages.playlists}
      subtext={strings.ui.xPlaylists}
    />
  )
  const newReleases = (
    <MediaPage
      fetchFn={getNewReleases}
      title={strings.pages.newReleases}
      subtext={strings.ui.xAlbums}
    />
  )
  const popularPlaylists = (
    <MediaPage
      fetchFn={getFeaturedPlaylists}
      title={strings.pages.popularPlaylists}
      subtext={strings.ui.xPlaylists}
    />
  )
  return (
    <Wrapper isLoggedIn={isLoggedIn}>
      <Routes>
        <Route
          path="/saved-albums"
          element={isLoggedIn ? savedAlbums : redirect}
        />
        <Route
          path="/saved-artists"
          element={isLoggedIn ? savedArtists : redirect}
        />
        <Route
          path="/saved-songs"
          element={isLoggedIn ? savedTracks : redirect}
        />
        <Route
          path="/my-playlists"
          element={isLoggedIn ? savedPlaylists : redirect}
        />
        <Route
          path="/artist/:id"
          element={isLoggedIn ? <ViewArtist /> : redirect}
        />
        <Route
          path="/discover"
          element={isLoggedIn ? <Discover /> : redirect}
        />
        <Route
          path="/new-releases"
          element={isLoggedIn ? newReleases : redirect}
        />
        <Route
          path="/popular-playlists"
          element={isLoggedIn ? popularPlaylists : redirect}
        />
        <Route
          path="/search/:term"
          element={isLoggedIn ? <Search /> : redirect}
        />
        <Route
          path="/search-tracks/:term"
          element={isLoggedIn ? <MediaSearchPage type="track" /> : redirect}
        />
        <Route
          path="/search-albums/:term"
          element={isLoggedIn ? <MediaSearchPage type="album" /> : redirect}
        />
        <Route
          path="/search-artists/:term"
          element={isLoggedIn ? <MediaSearchPage type="artist" /> : redirect}
        />
        <Route
          path="/search-playlists/:term"
          element={isLoggedIn ? <MediaSearchPage type="playlist" /> : redirect}
        />
        <Route path="/login" element={<LoginScene onLogin={setIsLoggedIn} />} />
      </Routes>
    </Wrapper>
  )
}
