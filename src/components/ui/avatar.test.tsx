import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'
import { Avatar } from './avatar'

describe('Avatar', () => {
  it('renders Avatar correctly', () => {
    const image = faker.image.abstract()
    render(
      <ThemeProvider theme={mainStyles}>
        <Avatar imagePath={image} />
      </ThemeProvider>,
    )
    const canvasElement = screen.getByRole('img', { hidden: true })
    expect(canvasElement).toBeInTheDocument()
    expect(canvasElement).toHaveAttribute('src', image)
  })
})
