import { GrayIconButton } from 'components/ui'
import { useState, VFC } from 'react'
import styled from 'styled-components'
import { MobileMenu } from './mobileMenu'

const Wrapper = styled.div`
  flex-grow: 1;
  float: right;
  height: 100%;
`

export const Hamburger: VFC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const expandMenu = (): void => {
    setIsMenuOpen(true)
  }

  const closeMenu = (): void => {
    setIsMenuOpen(false)
  }

  return (
    <Wrapper>
      <GrayIconButton iconClass="fa-bars" onClickCallback={expandMenu} />
      <MobileMenu closeMenu={closeMenu} isOpen={isMenuOpen} />
    </Wrapper>
  )
}
