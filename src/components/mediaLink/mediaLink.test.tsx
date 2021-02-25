import { render } from '@testing-library/react'

import { MediaLink } from './mediaLink'
import { Album } from 'types/media'

describe('MediaLink', () => {
  it('renders MediaLink correctly', () => {
    const album: Album = {
      id: '01',
      name: 'Oceans',
      artists: [
        { id: '02', name: 'Foo' },
        { id: '03', name: 'Bar' },
      ],
      totalTracks: 10,
    }
    const { getByText } = render(<MediaLink mediaInfo={album} />)
    let linkElement = getByText('Oceans')
    expect(linkElement).toBeTruthy()
    linkElement = getByText('Foo, Bar')
    expect(linkElement).toBeTruthy()
  })
})
