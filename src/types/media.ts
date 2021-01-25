type media = {
  name: string
  images?: Array<string>
  id: string
}

type reference = string

export interface Album extends media {
  artists: Array<media>
  totalTracks: number
}

export interface Song extends media {
  artists: Array<media>
  albumReference: reference
  duration: number
}

export interface SimpleArtist extends media {
  genres: Array<string> | []
  followers: number
  popularity: number
}
