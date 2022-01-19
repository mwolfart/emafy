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

export enum Method {
  GET,
  PUT,
  DELETE,
}

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
  const header = createHeader()
  return { ...header, params: { ...params } }
}

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
})

const spotifyInstance = <T>(
  url: string,
  method: Method,
  otherParams?: { [key: string]: string },
): Promise<AxiosResponse<T>> => {
  switch (method) {
    case Method.PUT:
      return instance.put(url, createRequestParams(otherParams))
    case Method.DELETE:
      return instance.delete(url, createRequestParams(otherParams))
    case Method.GET:
    default:
      return instance.get(url, createRequestParams(otherParams))
  }
}

export { spotifyInstance, createHeader }
