import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'

import { Modal } from './modal'

describe('Modal', () => {
  it('renders Modal correctly', () => {
    render(<Modal closeModalCallback={() => {}}>Text</Modal>)
    const modalElement = screen.getByText('Text')
    expect(modalElement).toBeTruthy()
  })

  it('calls closeModalCallback on Modal close', () => {
    const onClose = jest.fn()
    render(<Modal closeModalCallback={onClose}>Modal Text</Modal>)
    const modalElement = screen.getByRole('button', {
      name: strings.components.closeButton,
    })
    fireEvent.click(modalElement)
    expect(onClose).toHaveBeenCalled()
  })
})
