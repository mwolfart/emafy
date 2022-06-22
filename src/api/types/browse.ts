import { RawTrack } from './media'

export type RawCategory = {
  id: string
  name: string
}

export type RawRecommendations = {
  tracks: RawTrack[]
}
