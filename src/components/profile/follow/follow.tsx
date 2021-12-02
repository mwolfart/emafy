import { checkIfOwnFollowsArtist } from 'api/data'
import { ContainerFlexRow, Headline, IconButton } from 'components/ui'
import { UserAvatar } from 'components/ui/userAvatar'
import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import { SimpleArtist } from 'types/media'

type Props = {
  follow: SimpleArtist
  isCurrentUserFollowing: boolean
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme = mainStyles }: GlobalProps) => `
    padding: ${theme.divSpacingSmall} 0;
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
    width: 100%;
  `}
`

export const Follow: VFC<Props> = ({ follow, isCurrentUserFollowing }) => {
  const followImage = (follow.images?.length && follow.images[0]) || ''
  const iconLabel = isCurrentUserFollowing ? 'Following' : ''
  const iconClass = isCurrentUserFollowing ? 'fa-user-minus' : 'fa-user-plus'

  return (
    <Wrapper>
      <UserAvatar imagePath={followImage} small={true} />
      <Headline title={follow.name} subtitle="View artist" />
      <IconButton
        title={iconLabel}
        icon={iconClass}
        onClickCallback={() => {}}
      />
    </Wrapper>
  )
}
