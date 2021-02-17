import React from 'react'
import { render } from '@testing-library/react'

import { CleanButton } from '../index'

describe('CleanButton', () => {
  it('renders CleanButton correctly', () => {
    const { container } = render(<CleanButton>Text</CleanButton>)
    expect(container.childElementCount).toBeTruthy()
  })
})
