import { render } from '@testing-library/react'

import { MediaLink } from './mediaLink'
import { album } from 'fixtures/album'

describe('MediaLink', () => {
  it('renders MediaLink correctly', () => {
    const { getByText } = render(<MediaLink mediaInfo={album} />)
    let linkElement = getByText('Oceans')
    expect(linkElement).toBeTruthy()
    linkElement = getByText('Foo, Bar')
    expect(linkElement).toBeTruthy()
  })
})
