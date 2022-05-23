import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { faker } from '@faker-js/faker'
import { Canvas } from '../index'

describe('Canvas', () => {
  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Canvas>{text}</Canvas>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText(text)
    expect(canvasElement).toBeInTheDocument()
  })
})
