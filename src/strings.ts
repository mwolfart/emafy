export const strings = {
  ui: {
    grid: 'Grid',
    list: 'List',
    previous: 'Previous',
    next: 'Next',
    follow: 'Follow',
    unfollow: 'Unfollow',
    closeModal: 'Close modal',
    closeMenu: 'Close menu',
    openNavMenu: 'Open navigation menu',
    toggleView: 'Click to toggle view',
    tracks: 'Tracks',
    playlists: 'Playlists',
    followers: 'Followers',
    followedArtists: 'Followed artists',
    relatedArtists: 'Related artists',
    play: 'Play',
    pause: 'Pause',
    nextTrack: 'Next track',
    previousTrack: 'Previous track',
    playTrack: 'Play track',
    playPlaylist: 'Play playlist',
    playTopTracks: 'Play top tracks',
    viewQueue: 'View songs in queue',
    adjustVolume: 'Adjust volume',
    nowPlaying: 'Now playing',
    nextInQueue: 'Songs in queue',
    listenTo: 'Listen to',
    loginUsingSpotify: 'Login using Spotify',
    seeAll: 'See all',
    xAlbums: (x: number) => `${x} album${x !== 1 ? 's' : ''}`,
    xTracks: (x: number) => `${x} track${x !== 1 ? 's' : ''}`,
    xArtists: (x: number) => `${x} artist${x !== 1 ? 's' : ''}`,
    xPlaylists: (x: number) => `${x} playlist${x !== 1 ? 's' : ''}`,
  },
  headings: {
    topSongs: 'Top songs',
    topArtists: 'Top artists',
    whatsNew: "What's new",
    newReleases: 'New Releases',
    popularPlaylists: 'Popular playlists',
    tracksFound: 'Tracks found',
    artistsFound: 'Artists found',
    albumsFound: 'Albums found',
    playlistsFound: 'Playlists found',
    interfaceTheme: 'Interface theme',
    fontStyle: 'Font style',
    language: 'Language',
    settings: 'Settings',
  },
  inputs: {
    light: 'Light',
    dark: 'Dark',
    english: 'English',
    portugueseBr: 'Portuguese (Brazil)',
    spanish: 'Spanish',
    german: 'German',
    classic: 'Classic',
    modern: 'Modern',
    typewriter: 'Typewriter',
    strong: 'Strong',
  },
  components: {
    media: {
      coverImage: 'Cover image',
      noCoverImage: 'No cover image available',
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
      logout: 'Logout',
    },
  },
  error: {
    auth: 'There was an error during the authentication, please, refresh the webpage and try again',
    fetchData: 'There was an error while fetching the data',
    fetchUser: 'Error while fetching user info',
    fetchToken: 'Error while fetching token',
    refreshToken: 'Error while retrieving a new token',
    loginFailed: 'Login failed',
    noResults:
      'Oops! No results were found for this query. Perhaps try a different one.',
  },
  pages: {
    signIn: 'Sign in',
    savedAlbums: 'My Liked Albums',
    savedTracks: 'My Liked Songs',
    followedArtists: 'My Followed Artists',
    playlists: 'My Public Playlists',
    discover: 'Discover',
    newReleases: 'New Releases',
    popularPlaylists: 'Popular Playlists',
  },
  content: {
    signInInstructions:
      'To start using the platform, please login using the Spotify API through the link below',
    seeWhatsPopping: "See what's popping this week",
  },
}
