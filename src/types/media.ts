import { RawTracksAlbum } from './apiMedia'

export enum MediaType {
  artist = 'artist',
  song = 'song',
  album = 'album',
}

export type Media = {
  name: string
  images?: Array<string>
  id: string
  mediaType: MediaType.album | MediaType.song | MediaType.artist
}

export type User = {
  country: string
  name: string
  email: string
  id: string
  images?: Array<string>
  followerCount: number
}

type Reference = string

export interface Album extends Media {
  artists: Array<Media>
  totalTracks: number
  mediaType: MediaType.album
}

export interface Song extends Media {
  artists: Array<Media>
  duration: number
  mediaType: MediaType.song
  trackNumber: number
  albumReference: Reference
}

export interface SimpleArtist extends Media {
  genres: Array<string>
  followers: number
  popularity: number
  mediaType: MediaType.artist
}

export const isAlbum = (media: Media | RawTracksAlbum): media is Album =>
  typeof media === 'object' &&
  'mediaType' in media &&
  media.mediaType === MediaType.album

export const isSong = (media: Media): media is Song =>
  typeof media === 'object' &&
  'mediaType' in media &&
  media.mediaType === MediaType.song

export const isArtist = (media: Media): media is SimpleArtist =>
  typeof media === 'object' &&
  'mediaType' in media &&
  media.mediaType === MediaType.artist
