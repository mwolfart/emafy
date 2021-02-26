import { render, screen } from '@testing-library/react'

import { MediaLink } from './mediaLink'
import { album } from 'fixtures/album'

describe('MediaLink', () => {
  it('renders MediaLink correctly', () => {
    render(<MediaLink mediaInfo={album} />)
    let linkElement = screen.getByText(album.name)
    expect(linkElement).toBeTruthy()
    linkElement = screen.getByText(`${album.artists[0]}, ${album.artists[1]}`)
    expect(linkElement).toBeTruthy()
  })
})
