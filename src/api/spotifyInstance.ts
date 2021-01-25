import axios, { AxiosResponse } from 'axios'

type headerProps = {
  headers: {
    Authorization: string
  }
}

const createHeader = (): headerProps => {
  const accessToken = localStorage.getItem('access_token')
  return {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  }
}

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
})

const spotifyInstance = <T>(
  params: string,
): Promise<AxiosResponse<{ items: T[]; next?: string }>> =>
  instance.get(params, createHeader())

export { spotifyInstance, createHeader }
