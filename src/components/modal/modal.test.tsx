import React from 'react'
import { fireEvent, render } from '@testing-library/react'

import { Modal } from './modal'

describe('Modal', () => {
  it('renders Modal correctly', () => {
    const { container } = render(
      <Modal closeModalCallback={() => {}}>Text</Modal>,
    )
    expect(container.childElementCount).toBeTruthy()
  })

  it('calls closeModalCallback on Modal close', () => {
    const onClose = jest.fn()
    const { getByLabelText } = render(
      <Modal closeModalCallback={onClose}>Modal Text</Modal>,
    )
    fireEvent.click(getByLabelText('Close modal'))
    expect(onClose).toHaveBeenCalled()
  })
})
