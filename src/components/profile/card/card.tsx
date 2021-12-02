import { UserAvatar } from 'components/ui/userAvatar'
import {
  Headline,
  GrayIconButton,
  IconHeadline,
  Rectangle,
  IconButton,
} from 'components/ui'
import { ContainerFlexRow } from 'components/ui/container'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { User } from 'types/media'

type Props = {
  user: User
  followingCount: number
  savedMusicCount: number
  playlistCount: number
}

const Wrapper = styled(Rectangle)`
  ${({ theme = mainStyles }: GlobalProps) => `
    width: 50%;
    height: fit-content;
    box-shadow: ${theme?.shadowDimensionsDefault};
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

export const ProfileCard: VFC<Props> = ({
  user,
  followingCount,
  savedMusicCount,
  playlistCount,
}) => {
  const userImage = (user.images?.length && user.images[0]) || ''
  const userFollowerCount = user.followerCount

  return (
    <Wrapper>
      <FlexRowAlignRight>
        <GrayIconButton iconClass="fa-star" onClickCallback={() => {}} />
        <GrayIconButton iconClass="fa-dots" onClickCallback={() => {}} />
      </FlexRowAlignRight>
      <UserAvatar imagePath={userImage} />
      <ContainerFlexRow>
        <Headline title={user.name} subtitle={user.country} />
        <IconButton icon="fa-user-check" onClickCallback={() => {}} />
      </ContainerFlexRow>
      <Dash />
      <IconHeadline
        icon="fa-user-friends"
        title={userFollowerCount.toString()}
        subtitle="Followers"
      />
      <IconHeadline
        icon="fa-user-friends"
        title={followingCount.toString()}
        subtitle="Followed Artists"
      />
      <IconHeadline
        icon="fa-music"
        title={savedMusicCount.toString()}
        subtitle="Tracks"
      />
      <Dash />
      <IconHeadline
        icon="fa-list"
        title={playlistCount.toString()}
        subtitle="Playlists"
      />
    </Wrapper>
  )
}
