import { GrayIconButton } from 'components/ui'
import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
  title: string
  path: string
  icon: string
  closeMenu: () => void
}

const Wrapper = styled.div`
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.palette.colorGray100};
    padding: ${theme.divSpacingMedium} 0;
    font-size: ${theme.fontSizeTitle};
  `}
`

export const MobileMenuButton: FC<Props> = ({
  title,
  path,
  icon,
  closeMenu,
}) => (
  <Wrapper>
    <RouterLink to={path}>
      <GrayIconButton
        title={title}
        iconClass={icon}
        onClickCallback={closeMenu}
      />
    </RouterLink>
  </Wrapper>
)
