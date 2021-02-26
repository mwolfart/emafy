import { render, screen } from '@testing-library/react'

import { MediaLink } from './mediaLink'
import { album } from 'fixtures/album'

describe('MediaLink', () => {
  it('renders MediaLink correctly', () => {
    render(<MediaLink mediaInfo={album} />)
    let linkElement = screen.getByText('Oceans')
    expect(linkElement).toBeTruthy()
    linkElement = screen.getByText('Foo, Bar')
    expect(linkElement).toBeTruthy()
  })
})
