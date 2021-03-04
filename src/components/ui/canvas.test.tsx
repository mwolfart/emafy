import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { Canvas } from './index'

describe('Canvas', () => {
  it('renders Canvas correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <Canvas>{text}</Canvas>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText(text)
    expect(canvasElement).toBeTruthy()
  })
})
