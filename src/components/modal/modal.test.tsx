import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { faker } from '@faker-js/faker'
import { Modal } from './modal'
import { defaultTheme } from 'theme'

describe('Modal', () => {
  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal closeModalCallback={() => {}}>{text}</Modal>
      </ThemeProvider>,
    )
    const modalElement = screen.getByText(text)
    expect(modalElement).toBeInTheDocument()
  })

  it('calls callback on Modal close', () => {
    const text = faker.random.words()
    const onClose = jest.fn()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Modal closeModalCallback={onClose}>{text}</Modal>
      </ThemeProvider>,
    )
    const modalElement = screen.getByRole('button', {
      name: strings.components.modal.closeModal,
    })
    fireEvent.click(modalElement)
    expect(onClose).toHaveBeenCalled()
  })
})
