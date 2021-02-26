import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { Modal } from './modal'

describe('Modal', () => {
  it('renders Modal correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Modal closeModalCallback={() => {}}>Text</Modal>
      </ThemeProvider>,
    )
    const modalElement = screen.getByText('Text')
    expect(modalElement).toBeTruthy()
  })

  it('calls closeModalCallback on Modal close', () => {
    const onClose = jest.fn()
    render(
      <ThemeProvider theme={mainStyles}>
        <Modal closeModalCallback={onClose}>Modal Text</Modal>
      </ThemeProvider>,
    )
    const modalElement = screen.getByRole('button', {
      name: strings.components.closeButton,
    })
    fireEvent.click(modalElement)
    expect(onClose).toHaveBeenCalled()
  })
})
