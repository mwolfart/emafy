import { fireEvent, render, screen } from '@testing-library/react'
import { strings } from 'strings'

import { CloseButton } from './closeButton'

describe('CloseButton', () => {
  it('renders CloseButton correctly', () => {
    render(<CloseButton onClickCallback={() => {}} />)
    const buttonElement = screen.getByRole('button', {
      name: strings.components.closeButton,
    })
    expect(buttonElement).toBeInTheDocument()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    render(<CloseButton onClickCallback={onClick} />)
    const buttonElement = screen.getByRole('button', {
      name: strings.components.closeButton,
    })
    fireEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalled()
  })
})
