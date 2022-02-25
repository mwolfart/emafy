import { RawUser } from 'types/api/apiUser'
import { User } from 'types/media'
import { parseImages } from '.'

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
