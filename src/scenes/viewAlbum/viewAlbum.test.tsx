import { render } from '@testing-library/react'
import { album } from 'fixtures/album'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { ViewAlbum } from './viewAlbum'

describe('View Album', () => {
  it('renders View Album scene correctly', () => {
    const { container } = render(
      <ThemeProvider theme={mainStyles}>
        <ViewAlbum albumInfo={album} />
      </ThemeProvider>,
    )
    expect(container.childElementCount).toBeTruthy()
  })
})
