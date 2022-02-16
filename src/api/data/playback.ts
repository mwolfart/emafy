import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { spotifyInstance, Method } from 'api/spotifyInstance'

export const transferPlaybackHere = (deviceId?: string): Promise<boolean> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.PLAYER
  return spotifyInstance<boolean>(
    route,
    Method.PUT,
    {},
    {
      device_ids: [deviceId || ''],
      play: 'false',
    },
  ).then(({ data }) => data)
}
