import { User } from 'types/media'
import { faker } from '@faker-js/faker'

export const user: User = {
  country: faker.address.countryCode(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  id: faker.random.alphaNumeric(),
  images: [faker.image.abstract()],
  followerCount: faker.datatype.number(200),
}
