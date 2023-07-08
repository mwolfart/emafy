import { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import { ProfileInfo } from './profileInfo'
import { SearchField } from './searchField'
import { GrayIconButton } from 'components/ui'
import { strings } from 'strings'
import { Hamburger } from '../hamburger/hamburger'
import { logout } from 'api/credentials'
import { useNavigate } from 'react-router'

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    padding: ${theme.divSpacingMedium};
    position: fixed;
    background-color: white;
    width: calc(100% - 2 * ${theme.divSpacingMedium});
    height: calc(${theme.topbarHeight} - 2 * ${theme.divSpacingMedium});
  `}
`

const Dash = styled.div`
  ${({ theme }) => `
    border-left: 2px solid ${theme.palette.colorGray300};
    margin: 5px 0;

    @media (max-width: 576px) {
      display: none;
    }
  `}
`

const ButtonsWrapper = styled.div`
  align-self: center;
  text-align: right;

  @media (max-width: 576px) {
    display: none;
  }
`

const HamburgerWrapper = styled.div`
  display: none;
  flex-grow: 1;

  @media (max-width: 576px) {
    display: block;
  }
`

export const Topbar: FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  return (
    <Wrapper>
      <ProfileInfo />
      <Dash />
      <SearchField />
      <ButtonsWrapper>
        <GrayIconButton
          iconClass="fa-right-from-bracket"
          iconSize={theme.fontSizeIcon}
          ariaLabel={strings.components.topbar.logout}
          onClickCallback={() => {
            logout()
            navigate('/login')
          }}
        />
      </ButtonsWrapper>
      <HamburgerWrapper>
        <Hamburger />
      </HamburgerWrapper>
    </Wrapper>
  )
}
