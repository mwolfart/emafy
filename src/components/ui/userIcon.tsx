import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'

type Props = {
  imagePath: string
}

const Icon = styled.img`
  ${({ theme = mainStyles }: GlobalProps) => `
    width: ${theme.imageSizeIcon};
    height: ${theme.imageSizeIcon};
    border-radius: ${theme.borderRadiusMedium};
    padding-right: ${theme.divSpacingSmall};
  `}
`

export const UserIcon: VFC<Props> = ({ imagePath }) => <Icon src={imagePath} />
