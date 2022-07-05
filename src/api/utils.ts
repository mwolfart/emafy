import { Nullable } from 'types/global'

export const extractNextFromNextURL = (nextUrl?: string): Nullable<string> => {
  if (!nextUrl) {
    return null
  }
  const params = new URLSearchParams(nextUrl)
  return `?offset=${params.get('offset')}&limit=${params.get('limit')}`
}
