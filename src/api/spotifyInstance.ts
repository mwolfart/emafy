import axios, { AxiosResponse } from 'axios'
import { LOCAL_STORAGE } from './localStorage.enum'

type HeaderProps = {
  headers: {
    Authorization: string
  }
}

const createHeader = (): HeaderProps => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  return {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  }
}

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
})

const spotifyInstance = <T>(params: string): Promise<AxiosResponse<T>> =>
  instance.get(params, createHeader())

export { spotifyInstance, createHeader }
