import { createContext } from 'react'

export const PlayerContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  playSong: (songId: string) => {},
})
