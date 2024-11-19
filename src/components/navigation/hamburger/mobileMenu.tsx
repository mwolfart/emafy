import { FC } from 'react'
import { ButtonProps, mediaButtons, miscButtons } from '../navigationButtons'
import styled from 'styled-components'
import { MobileMenuButton } from './mobileMenuButton'
import { GrayIconButton } from 'components/ui'
import { strings } from 'strings'

interface Props {
  closeMenu: () => void
  isOpen: boolean
}

interface StyledProps {
  isOpen: boolean
}

const Wrapper = styled.div<StyledProps>`
  ${({ isOpen, theme }) => `
    display: flex;
    flex-direction: column;
    position: fixed;
    right: 0;
    top: 0;
    width: 100vw;
    box-sizing: border-box;
    height: 100%;
    background-color: white;
    padding: 0 ${theme.divSpacingBig};
    right: ${isOpen ? '0' : '-100vw'};
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

export const MobileMenu: FC<Props> = ({ closeMenu, isOpen }) => {
  const buttonGenerationFn = ({
    title,
    path,
    icon,
  }: ButtonProps): JSX.Element => (
    <MobileMenuButton
      title={title}
      key={path}
      path={path}
      icon={icon}
      closeMenu={closeMenu}
    />
  )

  return (
    <Wrapper isOpen={isOpen}>
      <CloseButtonWrapper>
        <GrayIconButton
          iconClass="fa-times"
          onClickCallback={closeMenu}
          ariaLabel={strings.ui.closeMenu}
          iconSize="24px"
        />
      </CloseButtonWrapper>
      {mediaButtons.map(buttonGenerationFn)}
      {miscButtons.map(buttonGenerationFn)}
    </Wrapper>
  )
}
