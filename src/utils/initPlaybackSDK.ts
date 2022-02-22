import { getToken } from 'api/credentials'
import { transferPlaybackHere } from 'api/data/playback'
import { Nullable } from 'types/global'
import { PlaybackSDK, WebPlaybackState } from 'types/playbackSDK'
import { emptyPlackbackSDK } from './constants'

const initListeners = (
  playbackSDK: PlaybackSDK,
  stateChangeCallback: (state: Nullable<WebPlaybackState>) => void,
): void => {
  playbackSDK.addListener('ready', ({ device_id }) => {
    transferPlaybackHere(device_id)
    playbackSDK.deviceId = device_id
  })
  playbackSDK.addListener('player_state_changed', (state) => {
    stateChangeCallback(state)
  })
  playbackSDK.addListener('initialization_error', ({ message }) => {
    // eslint-disable-next-line no-console
    console.error(message)
  })
  playbackSDK.addListener('authentication_error', ({ message }) => {
    // eslint-disable-next-line no-console
    console.error(message)
  })
  playbackSDK.addListener('account_error', ({ message }) => {
    // eslint-disable-next-line no-console
    console.error(message)
  })
}

export const initPlaybackSDK = (
  stateChangeCallback: (state: Nullable<WebPlaybackState>) => void,
): PlaybackSDK => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const windowNoType = window as any

  let playbackSDK: PlaybackSDK = emptyPlackbackSDK

  if (windowNoType.Spotify && windowNoType.Spotify.Player) {
    playbackSDK = new windowNoType.Spotify.Player({
      name: 'Emafy Spotify',
      getOAuthToken: (OAuthCallBack: (token: Nullable<string>) => void) => {
        OAuthCallBack(getToken())
      },
      volume: 0.3,
    })
    initListeners(playbackSDK, stateChangeCallback)
    playbackSDK.connect()
  }
  return playbackSDK
}
