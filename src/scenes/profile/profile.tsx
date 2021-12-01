import { getUserProfile } from 'api/data'
import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { User } from 'types/media'
import { ProfileCard } from 'components/profile/card/card'
import { FollowingList } from 'components/profile/followingList/followingList'
import { ContainerFlexRow } from 'components/ui'

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: ${theme.divSpacingExtraBig};
  `}
`

export const Profile: VFC = () => {
  // TODO refactor with topbar
  const emptyUser = {
    country: '',
    name: '',
    email: '',
    id: '',
    images: [],
    followerCount: 50,
  }
  const [user, setUser] = useState<User>(emptyUser)

  useEffect(() => {
    let cancelled = false

    getUserProfile().then((userData) => {
      if (!cancelled) {
        setUser(userData)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Wrapper>
      <ProfileCard user={user} />
      <FollowingList user={user} />
    </Wrapper>
  )
}
