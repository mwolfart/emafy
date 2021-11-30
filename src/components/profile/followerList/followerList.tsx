import { Headline } from 'components/ui'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { User } from 'types/media'
import { Follower } from '../follower/follower'

type Props = {
  user: User
}

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding-left: ${theme.divSpacingBig};
  `}
`

export const FollowerList: VFC<Props> = ({ user }) => {
  const userFollowerCount = 0
  const userFollowers: User[] = []
  return (
    <Wrapper>
      <Headline title="Followers" subtitle={userFollowerCount.toString()} />
      {userFollowers.map((follower) => (
        <Follower follower={follower} />
      ))}
    </Wrapper>
  )
}
