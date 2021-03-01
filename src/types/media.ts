export type Media = {
  name: string
  images?: Array<string>
  id: string
}

type Reference = string

export interface Album extends Media {
  artists: Array<Media>
  totalTracks: number
}

export interface Song extends Media {
  artists: Array<Media>
  albumReference: Reference
  duration: number
}

export interface SimpleArtist extends Media {
  genres: Array<string>
  followers: number
  popularity: number
}
