export enum MediaType {
  artist = 'artist',
  song = 'song',
  album = 'album',
}

export type Media = {
  name: string
  images?: Array<string>
  id: string
  type: MediaType.album | MediaType.song | MediaType.artist
}

type Reference = string

export interface Album extends Media {
  artists: Array<Media>
  totalTracks: number
  type: MediaType.album
}

export interface Song extends Media {
  artists: Array<Media>
  duration: number
  type: MediaType.song
  trackNumber: number
  albumReference?: Reference
}

export interface SimpleArtist extends Media {
  genres: Array<string>
  followers: number
  popularity: number
  type: MediaType.artist
}

export const isAlbum = (media: Media): media is Album =>
  media.type === MediaType.album

export const isSong = (media: Media): media is Song =>
  media.type === MediaType.song

export const isArtist = (media: Media): media is SimpleArtist =>
  media.type === MediaType.artist
