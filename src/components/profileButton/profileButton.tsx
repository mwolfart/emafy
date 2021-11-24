import { UserIcon } from 'components/ui/userIcon'
import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'
import profile from 'images/profile.png'
import { User } from 'types/media'

type Props = {
  userInfo: User
}

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    display: flex;
    flex-direction: row;
    padding-left: ${theme.divSpacingSmall};
    padding-right: ${theme.divSpacingExtraBig};

    @media (max-width: 576px) {
      padding-right: ${theme.divSpacingSmall};
    }
  `}
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    display: none;
  }
`

const Name = styled.span`
  ${({ theme = mainStyles }: GlobalProps) => `
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    font-weight: ${theme.fontBoldTwo};
    line-height: ${theme.lineHeightSimple};
    color: ${theme.palette.colorTextTitle};
    white-space: nowrap;
  `}
`

const Subtitle = styled.span`
  ${({ theme = mainStyles }: GlobalProps) => `
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeTiny};
    font-weight: ${theme.fontBoldOne};
    color: ${theme.palette.colorTextDisabled};
    text-transform: uppercase;
    white-space: nowrap;
  `}
`

export const ProfileButton: VFC<Props> = ({ userInfo }) => {
  return (
    <Wrapper>
      <UserIcon
        imagePath={(userInfo.images?.length && userInfo.images[0]) || profile}
      />
      <ProfileInfo>
        <Name>{userInfo.name}</Name>
        <Subtitle>View profile</Subtitle>
      </ProfileInfo>
    </Wrapper>
  )
}
