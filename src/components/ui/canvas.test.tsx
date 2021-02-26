import { render, screen } from '@testing-library/react'

import { Canvas } from './index'

describe('Canvas', () => {
  it('renders Canvas correctly', () => {
    render(<Canvas>Text</Canvas>)
    const canvasElement = screen.getByText('Text')
    expect(canvasElement).toBeTruthy()
  })
})
