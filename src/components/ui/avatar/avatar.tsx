import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  imagePath: string
  small?: boolean
}

interface StyledProps {
  small: boolean
}

const Image = styled.img<StyledProps>`
  ${({ small, theme }) => `
    width: ${small ? theme.imageSizeIcon : theme.imageSizeMedium};
    height: ${small ? theme.imageSizeIcon : theme.imageSizeMedium};
    border-radius: ${
      small ? theme.borderRadiusMedium : theme.borderRadiusImage
    };
    margin-right: ${theme.divSpacingMedium};
    object-fit: cover;
    align-self: center;

    ${
      !small &&
      `
      @media (max-width: 576px) {
        width: ${theme.imageSizeSmall};
        height: ${theme.imageSizeSmall};
      }
    `
    }
  `}
`

export const Avatar: FC<Props> = ({ imagePath, small = false }) => (
  <Image src={imagePath} aria-hidden={true} small={small} />
)
