import { fireEvent, render } from '@testing-library/react'
import { strings } from 'strings'

import { CloseButton } from './closeButton'

describe('CloseButton', () => {
  it('renders CloseButton correctly', () => {
    const { getByRole } = render(<CloseButton onClickCallback={() => {}} />)
    const buttonElement = getByRole('button', {
      name: strings.components.closeButton,
    })
    expect(buttonElement).toBeTruthy()
  })

  it('calls onClickCallback on button click', () => {
    const onClick = jest.fn()
    const { getByRole } = render(<CloseButton onClickCallback={onClick} />)
    const buttonElement = getByRole('button', {
      name: strings.components.closeButton,
    })
    fireEvent.click(buttonElement)
    expect(onClick).toHaveBeenCalled()
  })
})
