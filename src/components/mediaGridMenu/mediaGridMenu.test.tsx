import { render } from '@testing-library/react'

import { MediaGridMenu } from './mediaGridMenu'
import { albums } from 'fixtures/albums'
import { Album } from 'types/media'

describe('MediaGridMenu', () => {
  it('renders MediaGridMenu correctly', () => {
    const albumList = albums

    const { getByText } = render(<MediaGridMenu mediaList={albumList} />)

    const albumNames = albumList.map((album: Album) => album.name)
    albumNames.forEach((query: string): void => {
      const element = getByText(query)
      expect(element).toBeTruthy()
    })
  })
})
