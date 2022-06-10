import { FC } from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'

interface Props {
  title: string
  path: string
  icon: string
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: column;
    padding-left: ${theme.divSpacingSmall};
    padding-right: ${theme.divSpacingSmall};
    padding-top: ${theme.divSpacingSmall};
    text-align: center;
    color: ${theme.palette.colorTextSidebar};
    font-style: ${theme.fontStyle};
    font-size: ${theme.fontSizeTiny};
    line-height: ${theme.lineHeightSimple};
  `}
`

const IconBackground = styled.div`
  ${({ theme }) => `
    border-radius: ${theme.sidebarIconBig};
    background-image: linear-gradient(
        45deg,
        ${theme?.palette.colorPrimary},
        ${theme?.palette.colorButtonIntermed} 66%,
        ${theme?.palette.colorSecondary}
      );
    justify-content: center;
    place-self: center;
    align-items: center;
    display: flex;
    padding: ${theme.divSpacingSmall};
    color: ${theme.palette.colorBackground};
    width: ${theme.sidebarIconBig};
    height: ${theme.sidebarIconBig};

    @media (max-height: 900px) {
      border-radius: ${theme.sidebarIconMedium};
      width: ${theme.sidebarIconMedium};
      height: ${theme.sidebarIconMedium};
    }

    @media (max-height: 800px) {
      border-radius: ${theme.sidebarIconSmall};
      width: ${theme.sidebarIconSmall};
      height: ${theme.sidebarIconSmall};
    }
  `}
`

const CenteredIcon = styled.i`
  ${({ theme }) => `
    line-height: ${theme.sidebarIconBig};
  `}
`

export const SidebarButton: FC<Props> = ({ title, path, icon }) => {
  const iconClass = `fa fa-lg fa-fw ${icon}`
  return (
    <RouterLink to={path}>
      <Wrapper>
        <IconBackground>
          <CenteredIcon className={iconClass} />
        </IconBackground>
        {title}
      </Wrapper>
    </RouterLink>
  )
}
