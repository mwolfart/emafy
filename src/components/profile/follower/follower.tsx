import { Button, ContainerFlexRow, Headline } from 'components/ui'
import { UserAvatar } from 'components/ui/userAvatar'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { User } from 'types/media'

type Props = {
  follower: User
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: ${theme.divSpacingSmall};
  `}
`

export const Follower: VFC<Props> = ({ follower }) => {
  const followerImage = (follower.images?.length && follower.images[0]) || ''
  return (
    <Wrapper>
      <UserAvatar imagePath={followerImage} small={true} />
      <Headline title={follower.name} subtitle="View profile" />
      <Button>
        <i className="fa fa-user-plus" />
        Follow
      </Button>
    </Wrapper>
  )
}
