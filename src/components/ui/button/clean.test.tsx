import { render } from '@testing-library/react'

import { CleanButton } from '../index'

describe('CleanButton', () => {
  it('renders CleanButton correctly', () => {
    const { getByRole } = render(<CleanButton>Text</CleanButton>)
    const buttonElement = getByRole('button')
    expect(buttonElement).toBeTruthy()
  })
})
