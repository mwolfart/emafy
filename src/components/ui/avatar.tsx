import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  imagePath: string
  small?: boolean
}

interface IProps {
  small: boolean
}

const Image = styled.img<IProps>`
  ${({ small, theme }) => `
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

export const Avatar: VFC<Props> = ({ imagePath, small = false }) => (
  <Image src={imagePath} aria-hidden={true} small={small} />
)
