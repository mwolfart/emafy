import { RawImage } from './apiData'

export type RawUser = {
  country: string
  display_name: string
  email: string
  id: string
  images: RawImage[]
  followers: {
    href: string
    total: number
  }
}
