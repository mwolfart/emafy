import { render, screen } from '@testing-library/react'
import { ProfileInfo } from './profileInfo'
import faker from 'faker'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

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

    render(
      <ThemeProvider theme={mainStyles}>
        <ProfileInfo userInfo={userInfo} />
      </ThemeProvider>,
    )
    const element = screen.getByText(userName)
    expect(element).toBeInTheDocument()
  })
})
