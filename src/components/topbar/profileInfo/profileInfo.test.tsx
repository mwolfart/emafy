import { render, screen } from '@testing-library/react'
import { ProfileInfo } from './profileInfo'
import faker from 'faker'

describe('Profile Info', () => {
  it('renders component correctly', () => {
    const userName = faker.name.findName()
    const userImage = faker.image.abstract()
    const userInfo = {
      country: faker.address.countryCode(),
      name: userName,
      email: faker.internet.email(),
      id: faker.random.alphaNumeric(),
      images: [userImage],
    }

    render(<ProfileInfo userInfo={userInfo} />)
    const element = screen.getByText(userName)
    expect(element).toBeInTheDocument()
  })
})
