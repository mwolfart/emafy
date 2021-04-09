import axios, { AxiosResponse } from 'axios'
import { LOCAL_STORAGE } from './localStorage.enum'

type HeaderProps = {
  headers: {
    Authorization: string
  }
}

type RequestProps = {
  params: { [key: string]: string }
} & HeaderProps

const createHeader = (): HeaderProps => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  return {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  }
}

const createRequestParams = (params?: {
  [key: string]: string
}): RequestProps => {
  return { ...createHeader(), params: { ...params } }
}

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
})

const spotifyInstance = <T>(
  url: string,
  otherParams?: { [key: string]: string },
): Promise<AxiosResponse<T>> =>
  instance.get(url, createRequestParams(otherParams))

export { spotifyInstance, createHeader }
