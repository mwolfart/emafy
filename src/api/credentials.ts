import axios, { AxiosResponse } from 'axios'
import querystring from 'querystring'
import { strings } from 'strings'
import { Nullable } from 'types/global'
import { GRANT_TYPE } from './enum/grantType.enum'
import { LOCAL_STORAGE } from './enum/localStorage.enum'

type AuthorizeResponse = {
  code: Nullable<string>
  state: Nullable<string>
}

type TokenResponse = {
  access_token: Nullable<string>
  state: Nullable<string>
  token_type: Nullable<string>
  expires_in: Nullable<number>
  refresh_token: Nullable<string>
}

type RefreshTokenResponse = {
  access_token: Nullable<string>
  token_type: Nullable<string>
  expires_in: Nullable<number>
  scope: Nullable<string>
}

type CallbackFunction = {
  onSuccessCallback?: () => void
  onErrorCallback?: () => void
}

const spotifyUrl = 'https://accounts.spotify.com'
const authUrl = `${spotifyUrl}/authorize`
const tokenUrl = `${spotifyUrl}/api/token`

const headers = { 'Content-Type': 'application/x-www-form-urlencoded' }
const scope =
  'streaming user-read-private user-read-email user-library-read user-top-read streaming user-follow-read user-follow-modify playlist-read-collaborative playlist-read-private'

const client_id = process.env.REACT_APP_API_KEY ?? ''
const client_secret = process.env.REACT_APP_API_SECRET ?? ''
const redirect_uri = process.env.REACT_APP_API_URI ?? ''

const generateRandomString = (length: number): string => {
  let text = ''
  const possible =
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

const hasCrossSiteRequestForgery = (state: Nullable<string>): boolean => {
  const storedState = localStorage.getItem(LOCAL_STORAGE.AUTH_STATE)
  return state == null || state !== storedState
}

const setLocalTokenInfo = (
  access_token: string,
  expires_in: number,
  refresh_token?: string,
): void => {
  localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, access_token)
  localStorage.setItem(LOCAL_STORAGE.STORED_TIME, new Date().toString())
  localStorage.setItem(LOCAL_STORAGE.EXPIRES_IN, expires_in.toString())
  refresh_token &&
    localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refresh_token)
}

const storeFirstToken = (
  tokenInfo: TokenResponse,
  state: Nullable<string>,
): boolean => {
  const { access_token, refresh_token, expires_in } = tokenInfo
  if (!access_token || !expires_in || !refresh_token) {
    return false
  }

  if (hasCrossSiteRequestForgery(state)) {
    alert(strings.error.auth)
    return false
  }

  setLocalTokenInfo(access_token, expires_in, refresh_token)
  return true
}

const storeNewToken = (refreshTokenInfo: RefreshTokenResponse): boolean => {
  const { access_token, expires_in } = refreshTokenInfo
  if (!access_token || !expires_in) {
    return false
  }
  setLocalTokenInfo(access_token, expires_in)
  return true
}

const requestFirstToken = (
  code: Nullable<string>,
): Promise<AxiosResponse<TokenResponse>> => {
  const data = {
    grant_type: GRANT_TYPE.AUTH_CODE,
    code,
    redirect_uri: redirect_uri,
    client_id: client_id,
    client_secret: client_secret,
  }

  return axios.post(tokenUrl, querystring.stringify(data), { headers })
}

const requestNewToken = (): Promise<AxiosResponse<RefreshTokenResponse>> => {
  const refresh_token = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN)

  const data = {
    grant_type: GRANT_TYPE.REFRESH_TOKEN,
    refresh_token,
    client_id: process.env.REACT_APP_API_KEY ?? '',
    client_secret: process.env.REACT_APP_API_SECRET ?? '',
  }

  return axios.post(tokenUrl, querystring.stringify(data), { headers })
}

const isTokenExpired = (): boolean => {
  const unparsedExpiresIn = localStorage.getItem(LOCAL_STORAGE.EXPIRES_IN)
  const unparsedStoredTime = localStorage.getItem(LOCAL_STORAGE.STORED_TIME)

  if (!unparsedStoredTime || !unparsedExpiresIn) {
    return true
  }

  const expires_in = parseInt(unparsedExpiresIn)
  const storedTime = Date.parse(unparsedStoredTime) / 1000
  const currentTime = new Date().valueOf() / 1000
  const tokenExpired = storedTime + expires_in < currentTime
  return tokenExpired
}

const initToken = (
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void,
): void => {
  const { code, state } = getAuthParamsFromURI()

  requestFirstToken(code)
    .then(({ data: tokenInfo }) => {
      const storedSuccessfully = storeFirstToken(tokenInfo, state)
      if (!storedSuccessfully) {
        fail()
      }
      onSuccessCallback && onSuccessCallback()
    })
    .catch(() => {
      alert(strings.error.loginFailed)
      onErrorCallback && onErrorCallback()
    })
}

const updateToken = (
  onSuccessCallback?: () => void,
  onErrorCallback?: () => void,
): void => {
  requestNewToken()
    .then(({ data: refreshTokenInfo }) => {
      const storedSuccessfully = storeNewToken(refreshTokenInfo)
      if (!storedSuccessfully) {
        fail()
      }
      onSuccessCallback && onSuccessCallback()
    })
    .catch(() => {
      alert(strings.error.loginFailed)
      onErrorCallback && onErrorCallback()
    })
}

export const getAuthParamsFromURI = (): AuthorizeResponse => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const hashParams: any = {
    code: null,
    state: null,
  }
  let e
  const r = /([^&;=]+)=?([^&;]*)/g
  const q = window.location.search.substring(1)
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2])
  }
  return hashParams
}

export const authenticate = (): void => {
  const state = generateAndStoreStateToRequest()

  const requestUrl = `${authUrl}?response_type=code`
  const clientId = `&client_id=${encodeURIComponent(client_id)}`
  const scopeParam = `&scope=${encodeURIComponent(scope)}`
  const redirectUri = `&redirect_uri=${encodeURIComponent(redirect_uri)}`
  const stateParam = `&state=${encodeURIComponent(state)}`

  const url = requestUrl + clientId + scopeParam + redirectUri + stateParam
  window.location.href = url
}

export const hasToken = (): boolean =>
  !!localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

export const hasValidToken = (): boolean => hasToken() && !isTokenExpired()

export const hasAuthCode = (): boolean => {
  const { code } = getAuthParamsFromURI()
  return !!code
}

export const getLocalToken = (): Nullable<string> =>
  localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)

export const requestValidToken = ({
  onSuccessCallback,
  onErrorCallback,
}: CallbackFunction): void => {
  const hasToken = !!localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  if (!hasToken) {
    initToken(onSuccessCallback, onErrorCallback)
  } else {
    updateToken(onSuccessCallback, onErrorCallback)
  }
}

export const logout = (): void => {
  localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN)
  localStorage.removeItem(LOCAL_STORAGE.STORED_TIME)
  localStorage.removeItem(LOCAL_STORAGE.EXPIRES_IN)
  localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN)
}
