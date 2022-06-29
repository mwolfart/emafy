import { FC } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  onClick: () => void
  active?: boolean
}

type StyledProps = {
  active?: boolean
}

const Button = styled.button<StyledProps>`
  ${({ theme, active }) => `
    border: 0;
    border-bottom: 3px solid ${
      active ? theme.palette.colorSecondary : theme.palette.colorGray100
    };
    color: ${
      active ? theme.palette.colorTextTitle : theme.palette.colorGray600
    };
    background: transparent;
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    font-weight: ${theme.fontBoldTwo};
    padding: ${theme.divSpacingMedium} ${theme.divSpacingExtraBig};
    cursor: pointer;
  `}
`

export const TabButton: FC<Props> = ({ title, onClick, active }) => (
  <li>
    <Button onClick={onClick} active={active}>
      {title}
    </Button>
  </li>
)
