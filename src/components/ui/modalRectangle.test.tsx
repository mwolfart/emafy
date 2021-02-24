import { render } from '@testing-library/react'

import { ModalRectangle } from './index'

describe('ModalRectangle', () => {
  it('renders ModalRectangle correctly', () => {
    const { getByText } = render(<ModalRectangle>Text</ModalRectangle>)
    const rectangleElement = getByText('Text')
    expect(rectangleElement).toBeTruthy()
  })
})
