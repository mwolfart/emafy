import { VFC } from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import { GlobalProps } from 'types/global'
import { mainStyles } from 'styles'

type Props = {
  title: string
  path: string
  icon: string
}

type StyledProps = {
  iconSize: string
} & GlobalProps

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
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
  ${({ theme = mainStyles, iconSize }: StyledProps) => `
    border-radius: ${iconSize};
    background-image: linear-gradient(
        45deg,
        ${theme?.palette.colorPrimary},
        ${theme?.palette.colorButtonIntermed} 66%,
        ${theme?.palette.colorSecondary}
      );
    text-align: center;
    vertical-aling: middle;
    padding: ${theme.divSpacingSmall};
    color: ${theme.palette.colorBackground};
    width: ${iconSize};
    height: ${iconSize};
  `}
`

const CenteredIcon = styled.i`
  ${({ theme = mainStyles, iconSize }: StyledProps) => `
    line-height: ${iconSize};
  `}
`

export const SidebarButton: VFC<Props> = ({ title, path, icon }) => {
  const iconClass = `fa fa-lg fa-fw ${icon}`
  const iconSize = '27px'
  return (
    <RouterLink to={path}>
      <Wrapper>
        <IconBackground iconSize={iconSize}>
          <CenteredIcon className={iconClass} iconSize={iconSize} />
        </IconBackground>
        {title}
      </Wrapper>
    </RouterLink>
  )
}
