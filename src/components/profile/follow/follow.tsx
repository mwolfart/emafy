import { ContainerFlexRow, Headline, IconButton } from 'components/ui'
import { Avatar } from 'components/ui'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { SimpleArtist } from 'types/media'

type Props = {
  follow: SimpleArtist
  isCurrentUserFollowing: boolean
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme }) => `
    padding: ${theme.divSpacingSmall} 0;
    border-bottom: 2px solid ${theme.palette.colorTextSubtitleLarge};
    width: 100%;
  `}
`

export const Follow: VFC<Props> = ({ follow, isCurrentUserFollowing }) => {
  const followImage = (follow.images?.length && follow.images[0]) || ''
  const iconLabel = isCurrentUserFollowing
    ? strings.components.profile.follow.following
    : ''
  const iconClass = isCurrentUserFollowing ? 'fa-user-minus' : 'fa-user-plus'

  return (
    <Wrapper>
      <Avatar imagePath={followImage} small={true} />
      <Headline
        title={follow.name}
        subtitle={strings.components.profile.follow.view}
      />
      <IconButton
        title={iconLabel}
        icon={iconClass}
        onClickCallback={() => {}}
        resolutionToHideTitle="1200px"
      />
    </Wrapper>
  )
}
