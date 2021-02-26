import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { Canvas } from './index'

describe('Canvas', () => {
  it('renders Canvas correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Canvas>Text</Canvas>
      </ThemeProvider>,
    )
    const canvasElement = screen.getByText('Text')
    expect(canvasElement).toBeTruthy()
  })
})
