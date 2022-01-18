import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import faker from 'faker'
import { Avatar } from './avatar'

describe('Avatar', () => {
  it('renders component and props correctly', () => {
    const image = faker.image.abstract()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Avatar imagePath={image} />
      </ThemeProvider>,
    )
    const canvasElement = screen.getByRole('img', { hidden: true })
    expect(canvasElement).toBeInTheDocument()
    expect(canvasElement).toHaveAttribute('src', image)
  })
})
