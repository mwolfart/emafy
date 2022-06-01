import { Nullable } from 'types/global'

export type NextURL = Nullable<string>

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
