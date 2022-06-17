/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'
import { PlaybackMediaType } from 'types/playbackSDK'

export const PlayerContext = createContext({
  playMedia: (id: string, type: PlaybackMediaType) => {},
  playSong: (songId: string) => {},
  playAlbum: (albumId: string) => {},
  playArtist: (artistId: string) => {},
  playPlaylist: (playlistId: string) => {},
})
