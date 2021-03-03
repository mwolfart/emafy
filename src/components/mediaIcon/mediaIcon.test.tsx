import { render, screen } from '@testing-library/react'

import { MediaIcon } from './mediaIcon'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'
import { strings } from 'strings'

describe('MediaIcon', () => {
  it('renders MediaIcon correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <MediaIcon iconSize="100px" iconClass="fa fa-2x fa-times" />
      </ThemeProvider>,
    )

    const element = screen.getByLabelText(strings.components.mediaIcon)
    expect(element).toBeTruthy()
  })
})
