import { render, screen } from '@testing-library/react'
import { ProfileInfo } from './profileInfo'
import faker from 'faker'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { BrowserRouter as Router } from 'react-router-dom'

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
      followerCount: faker.datatype.number(100),
    }

    render(
      <ThemeProvider theme={mainStyles}>
        <Router>
          <ProfileInfo userInfo={userInfo} />
        </Router>
      </ThemeProvider>,
    )
    const element = screen.getByText(userName)
    expect(element).toBeInTheDocument()
  })
})
