import { Avatar } from 'components/ui'
import { FC, useContext } from 'react'
import styled from 'styled-components'
import { FooterHeadline } from 'components/ui'
import { UserContext } from 'contexts/user'

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

export const ProfileInfo: FC = () => {
  const { user } = useContext(UserContext)
  const imagePath =
    (user.images?.length && user.images[0]) || 'assets/images/profile.png'

  return (
    <Wrapper>
      <Avatar imagePath={imagePath} small={true} />
      <FooterHeadline title={user.name} />
    </Wrapper>
  )
}
