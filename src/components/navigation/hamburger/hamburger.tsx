import { GrayIconButton } from 'components/ui'
import { useState, FC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'
import { MobileMenu } from './mobileMenu'

const Wrapper = styled.div`
  flex-grow: 1;
  float: right;
  height: 100%;
  display: flex;
  align-items: center;
`

export const Hamburger: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const expandMenu = (): void => {
    setIsMenuOpen(true)
  }

  const closeMenu = (): void => {
    setIsMenuOpen(false)
  }

  return (
    <Wrapper>
      <GrayIconButton
        iconClass="fa-bars"
        onClickCallback={expandMenu}
        ariaLabel={strings.ui.openNavMenu}
        iconSize="24px"
      />
      <MobileMenu closeMenu={closeMenu} isOpen={isMenuOpen} />
    </Wrapper>
  )
}
