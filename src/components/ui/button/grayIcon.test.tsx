import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { GrayIconButton } from './grayIcon'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

describe('GrayIconButton', () => {
  it('renders GrayIconButton correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <GrayIconButton
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
        <GrayIconButton
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
