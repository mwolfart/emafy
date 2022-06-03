import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios'
import { LOCAL_STORAGE } from './enum/localStorage.enum'

export enum Method {
  GET,
  PUT,
  DELETE,
}

const createHeader = (): AxiosRequestHeaders => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)
  return {
    Authorization: 'Bearer ' + accessToken,
  }
}

const createRequestParams = (
  props?: AxiosRequestConfig,
): AxiosRequestConfig => {
  const headers = createHeader()
  return { headers, ...props }
}

const instance = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
})

const spotifyInstance = <T>(
  url: string,
  method: Method,
  configProps?: AxiosRequestConfig,
  bodyProps?: unknown,
): Promise<AxiosResponse<T>> => {
  switch (method) {
    case Method.PUT:
      return instance.put(
        url,
        bodyProps || {},
        createRequestParams(configProps),
      )
    case Method.DELETE:
      return instance.delete(url, createRequestParams(configProps))
    case Method.GET:
    default:
      return instance.get(url, createRequestParams(configProps))
  }
}

export { spotifyInstance, createHeader }
