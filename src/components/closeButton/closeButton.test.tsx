import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { CloseButton } from './closeButton'

describe('CloseButton', () => {
  it('renders CloseButton correctly', () => {
    const { container } = render(<CloseButton onClickCallback={() => {}} />)
    expect(container.childElementCount).toBeTruthy()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    const { getByLabelText } = render(<CloseButton onClickCallback={onClick} />)
    fireEvent.click(getByLabelText('Close modal'))
    expect(onClick).toHaveBeenCalled()
  })
})
