import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { AxiosResponse } from 'axios'
import { RawDevice, RawDeviceList } from 'types/api/apiPlayback'
import { Nullable } from 'types/global'

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

export const getAvailableDevices = (): Promise<RawDeviceList> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.PLAYER_DEVICES
  return spotifyInstance<RawDeviceList>(route, Method.GET).then(
    ({ data }) => data,
  )
}

export const getActiveDevice = (): Promise<Nullable<RawDevice>> => {
  return getAvailableDevices().then(({ devices }) => {
    let activeDevice = null,
      i = 0
    while (i < devices.length && !activeDevice) {
      if (devices[i].is_active) {
        activeDevice = devices[i]
      }
      i++
    }
    return activeDevice
  })
}
