import { RawArtist } from 'types/api/apiMedia'
import { SimpleArtist, MediaType } from 'types/media'
import { parseImages } from './images'

export const parseSimpleArtist = ({
  followers: { total },
  genres,
  id,
  images,
  name,
  popularity,
}: RawArtist): SimpleArtist => {
  const imagesLinks = parseImages(images)
  return {
    id,
    images: imagesLinks,
    name,
    genres,
    followers: total,
    popularity,
    mediaType: MediaType.artist,
  }
}

export const parseSimpleArtists = (
  items: Array<RawArtist>,
): Array<SimpleArtist> => items.map((rawArtist) => parseSimpleArtist(rawArtist))
