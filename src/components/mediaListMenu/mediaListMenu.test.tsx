import React from 'react'
import { render } from '@testing-library/react'

import { MediaListMenu } from './mediaListMenu'
import { Album } from 'types/media'

describe('MediaListMenu', () => {
  it('renders MediaListMenu correctly', () => {
    const albumA: Album = {
      id: '01',
      name: 'Oceans',
      artists: [
        { id: '02', name: 'Foo' },
        { id: '03', name: 'Bar' },
      ],
      totalTracks: 10,
    }

    const albumB: Album = {
      id: '04',
      name: 'Volcanos',
      artists: [
        { id: '02', name: 'Foo' },
        { id: '03', name: 'Bar' },
      ],
      totalTracks: 10,
    }

    const albumC: Album = {
      id: '05',
      name: 'Earthquake',
      artists: [{ id: '02', name: 'Foo' }],
      totalTracks: 10,
    }

    const albumD: Album = {
      id: '06',
      name: 'Carrot',
      artists: [{ id: '07', name: 'Gee' }],
      totalTracks: 10,
    }

    const albumList = [albumA, albumB, albumC, albumD]

    const { getByText, getAllByText } = render(
      <MediaListMenu mediaList={albumList} />,
    )
    let gridElement = getByText('Oceans')
    expect(gridElement).toBeTruthy()
    const gridElementList = getAllByText('Foo, Bar')
    expect(gridElementList.length).toEqual(2)
    gridElement = getByText('Foo')
    expect(gridElement).toBeTruthy()
    gridElement = getByText('Volcanos')
    expect(gridElement).toBeTruthy()
    gridElement = getByText('Earthquake')
    expect(gridElement).toBeTruthy()
    gridElement = getByText('Carrot')
    expect(gridElement).toBeTruthy()
  })
})
