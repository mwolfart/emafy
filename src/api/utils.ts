import { Nullable } from 'types/global'

export const extractNextFromNextURL = (nextUrl?: string): Nullable<string> => {
  return typeof nextUrl === 'string'
    ? nextUrl.slice(nextUrl.indexOf('?'))
    : null
}
