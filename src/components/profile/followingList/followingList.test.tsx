import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { artists } from 'fixtures/artists'
import { FollowingList } from './followingList'

describe('FollowingList', () => {
  it('renders component and props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <FollowingList
          followList={artists}
          followCount={10}
          nextURL={null}
          fetchMoreFollows={() => {}}
        />
      </ThemeProvider>,
    )

    const buttonCountElement = screen.getAllByRole('button')
    expect(buttonCountElement.length).toBe(10)
  })
})
