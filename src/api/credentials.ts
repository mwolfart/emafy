import axios from 'axios'

type hashParamsType = {
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

const getHashParams = (): hashParamsType => {
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

export const authenticate = (): void => {
  const stateKey = 'spotify_auth_state'
  const state = generateRandomString(16)
  localStorage.setItem(stateKey, state)

  const client_id = process.env.REACT_APP_API_KEY || ''
  const redirect_uri = `${process.env.REACT_APP_API_URI}`

  const scope =
    'user-read-private user-read-email user-library-read user-top-read streaming user-read-birthdate user-read-email user-read-private'

  let url = 'https://accounts.spotify.com/authorize'

  url += '?response_type=token'
  url += `&client_id=${encodeURIComponent(client_id)}`
  url += `&scope=${encodeURIComponent(scope)}`
  url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`
  url += `&state=${encodeURIComponent(state)}`
  window.location.href = url
}

export const login = (
  onLogin: (accessToken: string) => void,
): false | undefined => {
  const params = getHashParams()

  if (!params.access_token) {
    return false
  }

  const stateKey = 'spotify_auth_state'

  const { access_token, state } = params
  const storedState = localStorage.getItem(stateKey)

  localStorage.setItem('access_token', access_token)

  if (access_token && (state == null || state !== storedState)) {
    alert('There was an error during the authentication')
    return false
  }
  localStorage.removeItem(stateKey)
  if (access_token) {
    axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      })
      .then(function ({ data: { id } }) {
        localStorage.setItem('userName', id)
        onLogin(access_token)
      })
      .catch(function (error) {
        alert('Login failed')
      })
    return undefined
  }
  return undefined
}
