import { getUserProfile } from 'api/data'
import { UserAvatar } from 'components/ui/userAvatar'
import {
  Button,
  Headline,
  IconButton,
  IconHeadline,
  Rectangle,
} from 'components/ui'
import { ContainerFlexRow } from 'components/ui/container'
import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { User } from 'types/media'

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: ${theme.divSpacingExtraBig};
  `}
`

const Dash = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
  `}
`

const FlexRowAlignRight = styled(ContainerFlexRow)`
  justify-content: right;
`

export const Profile: VFC = () => {
  // TODO refactor with topbar
  const emptyUser = {
    country: '',
    name: '',
    email: '',
    id: '',
    images: [],
  }
  const [userInfo, setUserInfo] = useState<User>(emptyUser)

  useEffect(() => {
    let cancelled = false

    getUserProfile().then((userData) => {
      if (!cancelled) {
        setUserInfo(userData)
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const userImage = (userInfo.images?.length && userInfo.images[0]) || ''
  const userFollowerCount = 0
  const userSavedMusicCount = 0
  const userPlaylistsCount = 0

  return (
    <Wrapper>
      <Rectangle>
        <FlexRowAlignRight>
          <IconButton iconClass="fa-star" onClickCallback={() => {}} />
          <IconButton iconClass="fa-dots" onClickCallback={() => {}} />
        </FlexRowAlignRight>
        <UserAvatar imagePath={userImage} />
        <ContainerFlexRow>
          <Headline title={userInfo.name} subtitle={userInfo.country} />
          <Button square={true}>
            <i className="fa fa-user-check" />
          </Button>
        </ContainerFlexRow>
        <Dash />
        <IconHeadline
          icon="fa-user-friends"
          title={userFollowerCount.toString()}
          subtitle="Followers"
        />
        <IconHeadline
          icon="fa-music"
          title={userSavedMusicCount.toString()}
          subtitle="Tracks"
        />
        <Dash />
        <IconHeadline
          icon="fa-list"
          title={userPlaylistsCount.toString()}
          subtitle="Playlists"
        />
      </Rectangle>
    </Wrapper>
  )
}
