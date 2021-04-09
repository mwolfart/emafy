export const strings = {
  components: {
    closeButton: 'Close modal',
    toggleButton: 'Click to toggle view',
    mediaImage: {
      image: 'Cover image',
      noImage: 'No image available',
    },
  },
  hooks: {
    useGetSavedMedia: {
      errorFetchingData: 'There was an error while fetching the data',
    },
  },
  scenes: {
    login: {
      signin: 'Sign in',
      // eslint-disable-next-line prettier/prettier
      instructions: 'To start using the platform, please login using the Spotify API through the link below',
      loginUsingSpotify: 'Login using Spotify',
    },
    albums: {
      grid: 'Grid',
      list: 'List',
      mySavedAlbums: 'My Saved Albums',
      subtextAlbum: 'album',
      subtextAlbums: 'albums',
      errorLoadingAlbum: 'There was an error while fetching the album',
      errorLoadingAlbumTracks:
        "There was an error while fetching the current album's tracks",
    },
    songs: {
      mySavedSongs: 'My Saved Songs',
      subtextSong: 'song',
      subtextSongs: 'songs',
    },
    artists: {
      mySavedArtists: 'My Saved Artists',
      subtextArtist: 'artist',
      subtextArtists: 'artists',
    },
  },
  api: {
    credentials: {
      // eslint-disable-next-line prettier/prettier
      errorAuth: 'There was an error during the authentication, please, refresh the webpage and try again',
      errorUsername: 'Error while fetching user info',
      errorToken: 'Error while fetching token',
      errorRefreshToken: 'Error while retrieving a new token',
      errorLoginFailed: 'Login failed',
    },
  },
}
