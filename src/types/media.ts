import { RawTracksAlbum } from '../api/types/media'
import { NextURL } from './global'

export enum MediaType {
  artist = 'artist',
  song = 'song',
  album = 'album',
  playlist = 'playlist',
}

export type Media = {
  name: string
  images?: Array<string>
  id: string
  mediaType:
    | MediaType.album
    | MediaType.song
    | MediaType.artist
    | MediaType.playlist
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
  albumReference?: Reference
}

export interface SimpleArtist extends Media {
  genres: Array<string>
  followers: number
  popularity: number
  isCurrentUserFollowing?: boolean
  mediaType: MediaType.artist
}

export interface DetailedArtist extends SimpleArtist {
  relatedArtists: SimpleArtist[]
  topTracks: Song[]
  currentUserFollows: boolean
}

export interface Playlist extends Media {
  description: string
  owner: string
  mediaType: MediaType.playlist
}

export interface DetailedPlaylist extends Playlist {
  tracks: Array<Song>
}

export interface Category {
  id: string
  name: string
}

export type PagedDataList<T> = {
  entities: Array<T>
  next: NextURL
  total: number
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

export const isPlaylist = (media: Media): media is Playlist =>
  typeof media === 'object' &&
  'mediaType' in media &&
  media.mediaType === MediaType.playlist
