import { RawTracksAlbum } from "./apiMedia"

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
  albumReference: Reference
}

export interface SimpleArtist extends Media {
  genres: Array<string>
  followers: number
  popularity: number
  type: MediaType.artist
}

export const isAlbum = (media: Media | RawTracksAlbum): media is Album =>
  typeof media === 'object' && 'type' in media && media.type === MediaType.album

export const isSong = (media: Media): media is Song =>
  typeof media === 'object' && 'type' in media && media.type === MediaType.song

export const isArtist = (media: Media): media is SimpleArtist =>
  typeof media === 'object' &&
  'type' in media &&
  media.type === MediaType.artist
