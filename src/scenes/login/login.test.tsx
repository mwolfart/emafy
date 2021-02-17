import React from 'react'
import { render } from '@testing-library/react'

import { LoginScene } from './login'

describe('Login', () => {
  it('renders Login scene correctly', () => {
    const { container } = render(<LoginScene />)
    expect(container.childElementCount).toBeTruthy()
  })
})
