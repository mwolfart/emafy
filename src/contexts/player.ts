import { createContext } from 'react'

export const PlayerContext = createContext({
  playSong: (songId: string) => {},
})
