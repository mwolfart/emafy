import { FC } from 'react'
import styled from 'styled-components'
import { SidebarButton } from './sidebarButton'
import { ButtonProps, mediaButtons, miscButtons } from '../navigationButtons'

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette.colorBackgroundSidebar};
    height: 100%;
    width: ${theme.sidebarWidth};
    position: fixed;

    @media (max-width: 576px) {
      display: none;
    }
 `}
`

const SidebarPause = styled.div`
  height: 10%;
`

export const Sidebar: FC = () => {
  const buttonGenerationFn = ({
    title,
    path,
    icon,
  }: ButtonProps): JSX.Element => (
    <SidebarButton title={title} path={path} icon={icon} key={path} />
  )
  return (
    <Wrapper>
      {mediaButtons.map(buttonGenerationFn)}
      <SidebarPause />
      {miscButtons.map(buttonGenerationFn)}
    </Wrapper>
  )
}
