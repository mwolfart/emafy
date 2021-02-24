import { fireEvent, render } from '@testing-library/react'

import { CloseButton } from './closeButton'

describe('CloseButton', () => {
  it('renders CloseButton correctly', () => {
    const { getByRole } = render(<CloseButton onClickCallback={() => {}} />)
    const buttonElement = getByRole('button', { name: 'Close modal' })
    expect(buttonElement).toBeTruthy()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<CloseButton onClickCallback={onClick} />)
    const buttonElement = getByRole('button', { name: 'Close modal' })
    fireEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalled()
  })
})
