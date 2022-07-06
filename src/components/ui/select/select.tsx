import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

interface Props {
  options: Array<{ key: string; text: string }>
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void
  initialValue?: string
}

const Input = styled.select`
  ${({ theme }) => `
    width: 150px;
    padding: ${theme.divSpacingSmall};
    border-right: ${theme.divSpacingSmall} solid transparent;
    background-color: inherit;
    border: none;
    font-family: ${theme.fontStyle};
    font-size: ${theme.fontSizeTitleResponsive};
    font-weight: ${theme.fontBoldOne};
    color: ${theme.palette.colorGray500};
  `}
`

export const Select: FC<Props> = ({ options, onChange, initialValue }) => (
  <Input onChange={onChange} value={initialValue || ''}>
    {options.map(({ key, text }) => (
      <option key={key} value={key}>
        {text}
      </option>
    ))}
  </Input>
)
