import { render, screen } from '@testing-library/react'

import { Image } from './image'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { strings } from 'strings'

describe('MediaImage', () => {
  it('renders Media Image correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Image iconSize="100px" iconClass="fa fa-2x fa-times" />
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(strings.components.mediaImage.noImage)
    expect(element).toBeTruthy()
  })
})
