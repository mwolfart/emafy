import { render, screen } from '@testing-library/react'

import { ModalRectangle } from './index'

describe('ModalRectangle', () => {
  it('renders ModalRectangle correctly', () => {
    render(<ModalRectangle>Text</ModalRectangle>)
    const rectangleElement = screen.getByText('Text')
    expect(rectangleElement).toBeTruthy()
  })
})
