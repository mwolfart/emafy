import { VFC } from 'react'
import { ButtonProps, mediaButtons, miscButtons } from '../navigationButtons'
import styled from 'styled-components'
import { MobileMenuButton } from './mobileMenuButton'
import { GrayIconButton } from 'components/ui'
import { strings } from 'strings'

type Props = {
  closeMenu: () => void
  isOpen: boolean
}

interface IProps {
  isOpen: boolean
}

const Wrapper = styled.div<IProps>`
  ${({ isOpen, theme }) => `
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    background-color: white;
    padding: 0 ${theme.divSpacingMedium};
    right: ${isOpen ? '0' : '-200px'};
    transition: 0.5s;
  `}
`

const CloseButtonWrapper = styled.div`
  ${({ theme }) => `
    padding-top: ${theme.divSpacingMedium};
    padding-bottom: ${theme.divSpacingMedium};
    align-self: start;
  `}
`

export const MobileMenu: VFC<Props> = ({ closeMenu, isOpen }) => {
  const buttonGenerationFn = ({
    title,
    path,
    icon,
  }: ButtonProps): JSX.Element => (
    <MobileMenuButton title={title} path={path} icon={icon} />
  )

  return (
    <Wrapper isOpen={isOpen}>
      <CloseButtonWrapper>
        <GrayIconButton
          iconClass="fa-times"
          onClickCallback={closeMenu}
          ariaLabel={strings.components.hamburger.close}
        />
      </CloseButtonWrapper>
      {mediaButtons.map(buttonGenerationFn)}
      {miscButtons.map(buttonGenerationFn)}
    </Wrapper>
  )
}
