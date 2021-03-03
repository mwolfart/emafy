import { render, screen } from '@testing-library/react'

import { MediaIcon } from './mediaIcon'
import { mainStyles } from 'styles'
import { ThemeProvider } from 'styled-components'

describe('MediaIcon', () => {
  it('renders MediaIcon correctly', () => {
    const iconHint = 'Icon Test'

    render(
      <ThemeProvider theme={mainStyles}>
        <MediaIcon
          iconSize="100px"
          iconClass="fa fa-2x fa-times"
          iconHint={iconHint}
        />
      </ThemeProvider>,
    )

    const element = screen.getByLabelText(iconHint)
    expect(element).toBeTruthy()
  })
})
