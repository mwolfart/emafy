import { render, screen } from '@testing-library/react'

import { MediaImage } from './mediaImage'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { strings } from 'strings'

describe('MediaImage', () => {
  it('renders MediaImage correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <MediaImage iconSize="100px" iconClass="fa fa-2x fa-times" />
      </ThemeProvider>,
    )
    const element = screen.getByLabelText(strings.components.mediaImage.noImage)
    expect(element).toBeTruthy()
  })
})
