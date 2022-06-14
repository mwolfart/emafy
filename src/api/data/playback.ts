import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { AxiosError, AxiosResponse } from 'axios'
import { RawDevice, RawDeviceList } from 'api/types/playback'
import { Nullable } from 'types/global'
import { PlaybackMediaType } from 'types/playbackSDK'

export const transferPlaybackHere = async (
  deviceId?: string,
): Promise<void> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.PLAYER
  try {
    await spotifyInstance<boolean>(
      route,
      Method.PUT,
      {},
      {
        device_ids: [deviceId || ''],
        play: 'false',
      },
    )
  } catch (error) {
    if ((error as AxiosError).response?.status === 502) {
      await transferPlaybackHere(deviceId)
    }
  }
}

export const playMedia = (
  deviceId: string,
  mediaUri: string,
  type: PlaybackMediaType,
): Promise<AxiosResponse<void>> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.PLAYER_PLAY
  const context =
    type === 'track' ? { uris: [mediaUri] } : { context_uri: mediaUri }
  return spotifyInstance<void>(
    route,
    Method.PUT,
    { params: { device_id: deviceId } },
    context,
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
