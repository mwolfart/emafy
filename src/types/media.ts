export type Media = {
  name: string
  images?: Array<string>
  id: string
  type: 'album' | 'song' | 'artist'
}

type Reference = string

export interface Album extends Media {
  artists: Array<Media>
  totalTracks: number
  type: 'album'
}

export interface Song extends Media {
  artists: Array<Media>
  albumReference: Reference
  duration: number
  type: 'song'
}

export interface SimpleArtist extends Media {
  genres: Array<string>
  followers: number
  popularity: number
  type: 'artist'
}
