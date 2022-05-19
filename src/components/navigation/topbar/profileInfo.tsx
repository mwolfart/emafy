import { Avatar } from 'components/ui'
import { FC } from 'react'
import styled from 'styled-components'
import { User } from 'types/media'
import { strings } from 'strings'
import { Link as RouterLink } from 'react-router-dom'

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

const Description = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    display: none;
  }
`

const Name = styled.span`
  ${({ theme }) => `
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    font-weight: ${theme.fontBoldTwo};
    line-height: ${theme.lineHeightSimple};
    color: ${theme.palette.colorTextTitle};
    white-space: nowrap;
  `}
`

const Subtitle = styled.span`
  ${({ theme }) => `
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeTiny};
    font-weight: ${theme.fontBoldOne};
    color: ${theme.palette.colorTextDisabled};
    text-transform: uppercase;
    white-space: nowrap;
  `}
`

export const ProfileInfo: FC<Props> = ({ userInfo }) => {
  const imagePath = (userInfo.images?.length && userInfo.images[0]) || 'images/profile.png'
  const viewProfileText = strings.components.topbar.viewProfile

  return (
    <RouterLink to="/me/">
      <Wrapper>
        <Avatar imagePath={imagePath} small={true} />
        <Description>
          <Name>{userInfo.name}</Name>
          <Subtitle>{viewProfileText}</Subtitle>
        </Description>
      </Wrapper>
    </RouterLink>
  )
}
