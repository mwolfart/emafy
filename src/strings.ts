export const strings = {
  components: {
    carousel: {
      previous: 'Previous',
      next: 'Next',
    },
    modal: {
      closeModal: 'Close modal',
    },
    media: {
      image: {
        description: 'Cover image',
        unavailable: 'No cover image available',
      },
      toggleView: 'Click to toggle view',
    },
    sidebar: {
      songs: 'Songs',
      artists: 'Artists',
      albums: 'Albums',
      playlists: 'Playlists',
      genres: 'Genres',
      discover: 'Discover',
      settings: 'Settings',
    },
    topbar: {
      viewProfile: 'View profile',
      searchSong: 'Search for a song',
      viewStatistics: 'View statistics',
      searchFieldPlaceholder: 'Search for a song...',
    },
    hamburger: {
      open: 'Open navigation menu',
      close: 'Close menu',
    },
    profile: {
      card: {
        followers: 'Followers',
        followedArtists: 'Followed artists',
        tracks: 'Tracks',
        playlists: 'Playlists',
      },
      follow: {
        view: 'View artist',
        following: 'Following',
      },
      followedArtists: 'Followed artists',
    },
    player: {
      play: 'Play',
      pause: 'Pause',
      next: 'Next track',
      previous: 'Previous track',
      queue: 'View songs in queue',
      volume: 'Adjust volume',
      nowPlaying: 'Now playing',
      nextInQueue: 'Songs in queue',
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
      instructions:
        'To start using the platform, please login using the Spotify API through the link below',
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
    artistDetail: {
      albums: 'albums',
      follow: 'Follow',
      unfollow: 'Unfollow',
      relatedArtists: 'Related artists',
      play: 'Play top tracks',
    },
    playlists: {
      myPlaylists: 'My Public Playlists',
      subtextPlaylist: 'playlist',
      subtextPlaylists: 'playlists',
    },
    discover: {
      playlists: 'Playlists',
      playPlaylist: 'Play playlist',
      tracks: 'tracks',
      listenTo: 'Listen to',
      whatsNew: "What's new",
      whatsNewSubtitle: "See what's popping this week",
      seeAll: 'See all',
      topSongs: 'Top songs',
      topArtists: 'Top artists',
    },
    newAlbums: {
      newReleases: 'New releases',
    },
    popularPlaylists: {
      title: 'Popular playlists',
    },
  },
  api: {
    credentials: {
      // eslint-disable-next-line prettier/prettier
      errorAuth:
        'There was an error during the authentication, please, refresh the webpage and try again',
      errorUsername: 'Error while fetching user info',
      errorToken: 'Error while fetching token',
      errorRefreshToken: 'Error while retrieving a new token',
      errorLoginFailed: 'Login failed',
    },
  },
}
