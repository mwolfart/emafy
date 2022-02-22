import { Nullable } from 'types/global'

export type NextURL = Nullable<string>

export type SpotifyDataRequest<T, U> = {
  route: string
  parser: (items: T[]) => U[]
  next?: NextURL
  shouldGetInfoFromLoggedUser?: boolean
  otherParams?: { [key: string]: string }
}

export type RawMediaListResponse<T> = {
  items: T[]
  next?: string
  total: number
}

export type MediaListResponse<T> = {
  entities: Array<T>
  next: NextURL
  total: number
}

export type RawDevice = {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: boolean
}

export type RawDeviceList = {
  devices: RawDevice[]
}
