import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { AxiosResponse } from 'axios'

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

export const playMedia = (
  deviceId: string,
  mediaUri: string,
): Promise<AxiosResponse<void>> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.PLAYER_PLAY
  return spotifyInstance<void>(
    route,
    Method.PUT,
    {
      device_id: deviceId,
    },
    {
      uris: [mediaUri],
    },
  )
}
