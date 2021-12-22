import { GrayIconButton } from 'components/ui'
import { VFC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  title: string
  path: string
  icon: string
}

const Wrapper = styled.div`
  ${({ theme }) => `
    border-bottom: 1px solid ${theme.palette.colorBackgroundDisabled};
    padding: ${theme.divSpacingSmall} 0;
    font-size: ${theme.fontSizeParagraph};
  `}
`

export const MobileMenuButton: VFC<Props> = ({ title, path, icon }) => (
  <Wrapper>
    <RouterLink to={path}>
      <GrayIconButton
        title={title}
        iconClass={icon}
        onClickCallback={() => {}}
      />
    </RouterLink>
  </Wrapper>
)
