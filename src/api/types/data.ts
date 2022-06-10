import { NextURL } from 'types/global'

export type RawImage = {
  url: string
}

export type SpotifyDataRequest<T, U> = {
  route: string
  parser: (items: T[]) => U[]
  next?: NextURL
  shouldGetInfoFromLoggedUser?: boolean
  otherParams?: { [key: string]: string }
}
