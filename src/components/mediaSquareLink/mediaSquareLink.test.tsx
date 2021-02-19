import React from 'react'
import { render } from '@testing-library/react'

import { MediaSquareLink } from './mediaSquareLink'
import { Album } from 'types/media'

describe('MediaSquareLink', () => {
  it('renders MediaSquareLink correctly', () => {
    const album: Album = {
      id: '01',
      name: 'Oceans',
      artists: [
        { id: '02', name: 'Foo' },
        { id: '03', name: 'Bar' },
      ],
      totalTracks: 10,
    }
    const { getByText } = render(<MediaSquareLink mediaInfo={album} />)
    let linkElement = getByText('Oceans')
    expect(linkElement).toBeTruthy()
    linkElement = getByText('Foo, Bar')
    expect(linkElement).toBeTruthy()
  })
})
