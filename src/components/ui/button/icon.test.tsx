import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { IconButton } from './icon'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

describe('IconButton', () => {
  it('renders IconButton correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <IconButton
          iconClass="fa-times"
          ariaLabel={strings.components.modal.closeModal}
          onClickCallback={() => {}}
        />
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', {
      name: strings.components.modal.closeModal,
    })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    render(
      <ThemeProvider theme={mainStyles}>
        <IconButton
          iconClass="fa-times"
          ariaLabel={strings.components.modal.closeModal}
          onClickCallback={onClick}
        />
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', {
      name: strings.components.modal.closeModal,
    })
    fireEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalled()
  })
})
