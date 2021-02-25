import { render } from '@testing-library/react'

import { MediaRowLink } from './mediaRowLink'
import { Album } from 'types/media'

describe('MediaRowLink', () => {
  it('renders MediaRowLink correctly', () => {
    const album: Album = {
      id: '01',
      name: 'Oceans',
      artists: [
        { id: '02', name: 'Foo' },
        { id: '03', name: 'Bar' },
      ],
      totalTracks: 10,
    }
    const { getByText } = render(<MediaRowLink mediaInfo={album} />)
    let linkElement = getByText('Oceans')
    expect(linkElement).toBeTruthy()
    linkElement = getByText('Foo, Bar')
    expect(linkElement).toBeTruthy()
  })
})
