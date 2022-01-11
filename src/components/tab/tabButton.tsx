import { VFC } from 'react'
import styled from 'styled-components'

type Props = {
  title: string
  onClick: () => void
  active?: boolean
}

interface IProps {
  active?: boolean
}

const Button = styled.button<IProps>`
  ${({ theme, active }) => `
    border: 0;
    border-bottom: 3px solid ${
      active
        ? theme.palette.colorSecondary
        : theme.palette.colorBackgroundDisabled
    };
    color: ${
      active ? theme.palette.colorTextTitle : theme.palette.colorTextDisabled
    };
    background: transparent;
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeParagraph};
    font-weight: ${theme.fontBoldTwo};
    padding: ${theme.divSpacingMedium} ${theme.divSpacingExtraBig};
    cursor: pointer;
  `}
`

export const TabButton: VFC<Props> = ({ title, onClick, active }) => (
  <li>
    <Button onClick={onClick} active={active}>
      {title}
    </Button>
  </li>
)
