import React from 'react'
import { render } from '@testing-library/react'

import { ModalRectangle } from './index'

describe('ModalRectangle', () => {
  it('renders ModalRectangle correctly', () => {
    const { container } = render(<ModalRectangle>Text</ModalRectangle>)
    expect(container.childElementCount).toBeTruthy()
  })
})
