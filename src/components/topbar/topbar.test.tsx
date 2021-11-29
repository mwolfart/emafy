import { render } from '@testing-library/react'
import { Topbar } from './topbar'

describe('Topbar', () => {
  it('renders component correctly', () => {
    const { container } = render(<Topbar />)
    expect(container.firstChild).toBeTruthy()
  })
})
