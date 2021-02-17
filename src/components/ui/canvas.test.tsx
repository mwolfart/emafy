import React from 'react'
import { render } from '@testing-library/react'

import { Canvas } from './index'

describe('Canvas', () => {
  it('renders Canvas correctly', () => {
    const { container } = render(<Canvas>Text</Canvas>)
    expect(container.childElementCount).toBeTruthy()
  })
})
