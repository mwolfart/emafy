import { LOCAL_STORAGE } from './localStorage.enum'
import { spotifyInstance } from './spotifyInstance'

type HashParamsType = {
  access_token: null | string
  state: null | string
  token_type: null | string
  expires_in: null | number
}

const generateRandomString = (length: number): string => {
  let text = ''
  let possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

const generateAndStoreStateToRequest = (): string => {
  const state = generateRandomString(16)
  localStorage.setItem(LOCAL_STORAGE.AUTH_STATE, state)
  return state
}

const getHashParams = (): HashParamsType => {
  let hashParams = {
    access_token: null,
    state: null,
    token_type: null,
    expires_in: null,
  }
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1)
  while ((e = r.exec(q))) {
    /* @ts-ignore */
    hashParams[e[1]] = decodeURIComponent(e[2])
  }

  return hashParams
}

const hasCrossSiteRequestForgery = (state: string | null): boolean => {
  const storedState = localStorage.getItem(LOCAL_STORAGE.AUTH_STATE)
  return state == null || state !== storedState
}

export const authenticate = (): void => {
  const state = generateAndStoreStateToRequest()

  const client_id = process.env.REACT_APP_API_KEY ?? ''
  const redirect_uri = process.env.REACT_APP_API_URI ?? ''

  const scope =
    'user-read-private user-read-email user-library-read user-top-read streaming user-read-birthdate user-read-email user-read-private'

  const baseURL = 'https://accounts.spotify.com/authorize'

  const token = '?response_type=token'
  const clientId = `&client_id=${encodeURIComponent(client_id)}`
  const scopeParam = `&scope=${encodeURIComponent(scope)}`
  const redirectUri = `&redirect_uri=${encodeURIComponent(redirect_uri)}`
  const stateParam = `&state=${encodeURIComponent(state)}`

  const url = baseURL + token + clientId + scopeParam + redirectUri + stateParam
  window.location.href = url
}

export const login = (
  onLogin: (accessToken: string) => void,
): boolean | null => {
  const { access_token, state } = getHashParams()

  if (!access_token) {
    return null
  }

  if (hasCrossSiteRequestForgery(state)) {
    alert(
      'There was an error during the authentication, please, refresh the webpage and try again',
    )
    return false
  }

  localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, access_token)

  spotifyInstance<{ id: string }>('me')
    .then(function ({ data: { id } }) {
      localStorage.setItem(LOCAL_STORAGE.USER_NAME, id)
      onLogin(access_token)
    })
    .catch(function (error) {
      alert('Login failed')
    })
  return true
}
