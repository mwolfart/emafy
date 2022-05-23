import { Avatar } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'
import { User } from 'types/media'
import { strings } from 'strings'
import { Link as RouterLink } from 'react-router-dom'
import { FooterHeadline } from 'components/ui'

type Props = {
  userInfo: User
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    padding-left: ${theme.divSpacingSmall};
    padding-right: ${theme.divSpacingExtraBig};

    @media (max-width: 576px) {
      padding-right: ${theme.divSpacingSmall};
    }
  `}
`

export const ProfileInfo: FC<Props> = ({ userInfo }) => {
  const imagePath =
    (userInfo.images?.length && userInfo.images[0]) ||
    'assets/images/profile.png'
  const viewProfileText = strings.components.topbar.viewProfile

  return (
    <RouterLink to="/me/">
      <Wrapper>
        <Avatar imagePath={imagePath} small={true} />
        <FooterHeadline title={userInfo.name} subtitle={viewProfileText} />
      </Wrapper>
    </RouterLink>
  )
}
