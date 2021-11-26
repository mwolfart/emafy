import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'

import { IconButton } from './icon'

describe('IconButton', () => {
  it('renders IconButton correctly', () => {
    render(
      <IconButton
        iconClass="fa-times"
        ariaLabel={strings.components.closeButton}
        onClickCallback={() => {}}
      />,
    )
    const buttonElement = screen.getByRole('button', {
      name: strings.components.closeButton,
    })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    render(
      <IconButton
        iconClass="fa-times"
        ariaLabel={strings.components.closeButton}
        onClickCallback={() => {}}
      />,
    )
    const buttonElement = screen.getByRole('button', {
      name: strings.components.closeButton,
    })
    fireEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalled()
  })
})
