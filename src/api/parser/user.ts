import { RawUser } from 'api/types/user'
import { User } from 'types/media'
import { parseImages } from './images'

export const parseUserData = ({
  country,
  display_name,
  email,
  id,
  images,
  followers,
}: RawUser): User => ({
  id,
  name: display_name,
  email,
  country,
  images: parseImages(images),
  followerCount: followers.total,
})
