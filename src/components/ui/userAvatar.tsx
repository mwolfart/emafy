import { VFC } from 'react'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps } from 'types/global'

type Props = {
  imagePath: string
  small?: boolean
}

type StyledProps = {
  small: boolean
} & GlobalProps

const Image = styled.img`
  ${({ small, theme = mainStyles }: StyledProps) => `
    width: ${small ? theme.imageSizeIcon : theme.imageSizeMedium};
    height: ${small ? theme.imageSizeIcon : theme.imageSizeMedium};
    border-radius: ${
      small ? theme.borderRadiusMedium : theme.borderRadiusImage
    };
    margin-right: ${theme.divSpacingMedium};
    object-fit: cover;
    align-self: center;
  `}
`

export const UserAvatar: VFC<Props> = ({ imagePath, small = false }) => (
  <Image src={imagePath} aria-hidden={true} small={small} />
)
