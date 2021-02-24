import { render } from '@testing-library/react'

import { Canvas } from './index'

describe('Canvas', () => {
  it('renders Canvas correctly', () => {
    const { getByText } = render(<Canvas>Text</Canvas>)
    const canvasElement = getByText('Text')
    expect(canvasElement).toBeTruthy()
  })
})
