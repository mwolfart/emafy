import { Avatar } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'
import { User } from 'types/media'
import { FooterHeadline } from 'components/ui'

interface Props {
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

  return (
    <Wrapper>
      <Avatar imagePath={imagePath} small={true} />
      <FooterHeadline title={userInfo.name} />
    </Wrapper>
  )
}
