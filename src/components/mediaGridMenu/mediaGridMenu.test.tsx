import { render } from '@testing-library/react'

import { MediaGridMenu } from './mediaGridMenu'
import { Album } from 'types/media'

describe('MediaGridMenu', () => {
  it('renders MediaGridMenu correctly', () => {
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
      <MediaGridMenu mediaList={albumList} />,
    )

    const arr = ['Oceans', 'Foo', 'Volcanos', 'Earthquake', 'Carrot']
    arr.forEach((query: string): void => {
      const element = getByText(query)
      expect(element).toBeTruthy()
    })

    const gridElementList = getAllByText('Foo, Bar')
    expect(gridElementList.length).toEqual(2)
  })
})
