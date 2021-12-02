import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { artists } from 'fixtures/artists'
import { FollowingList } from './followingList'

describe('FollowingList', () => {
  it('renders FollowingList correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <FollowingList
          followList={artists}
          followCount={10}
          nextURL={null}
          fetchMoreFollows={() => {}}
        />
      </ThemeProvider>,
    )

    const buttonCountElement = screen.getAllByRole('button')
    expect(buttonCountElement).toEqual(10)
  })
})
