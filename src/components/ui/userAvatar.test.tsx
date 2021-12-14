import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'
import { UserAvatar } from './userAvatar'

describe('UserAvatar', () => {
  it('renders UserAvatar correctly', () => {
    const image = faker.image.abstract()
    render(
      <ThemeProvider theme={mainStyles}>
        <UserAvatar imagePath={image} />
      </ThemeProvider>,
    )
    const canvasElement = screen.getByRole('img', { hidden: true })
    expect(canvasElement).toBeInTheDocument()
    expect(canvasElement).toHaveAttribute('src', image)
  })
})
