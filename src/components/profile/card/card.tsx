import { UserAvatar } from 'components/ui/userAvatar'
import {
  Button,
  Headline,
  IconButton,
  IconHeadline,
  Rectangle,
} from 'components/ui'
import { ContainerFlexRow } from 'components/ui/container'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { User } from 'types/media'

type Props = {
  user: User
}

const Wrapper = styled(Rectangle)`
  width: 50%;
`

const Dash = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
  `}
`

const FlexRowAlignRight = styled(ContainerFlexRow)`
  justify-content: right;
`

export const ProfileCard: VFC<Props> = ({ user }) => {
  const userImage = (user.images?.length && user.images[0]) || ''
  const userFollowerCount = 0
  const userSavedMusicCount = 0
  const userPlaylistsCount = 0

  return (
    <Wrapper>
      <FlexRowAlignRight>
        <IconButton iconClass="fa-star" onClickCallback={() => {}} />
        <IconButton iconClass="fa-dots" onClickCallback={() => {}} />
      </FlexRowAlignRight>
      <UserAvatar imagePath={userImage} />
      <ContainerFlexRow>
        <Headline title={user.name} subtitle={user.country} />
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
    </Wrapper>
  )
}
