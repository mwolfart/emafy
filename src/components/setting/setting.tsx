import { ContainerFlexRow, Select } from 'components/ui'
import { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  options: Array<{ key: string; text: string }>
  onChange: (evt: ChangeEvent<HTMLSelectElement>) => void
  initialValue?: string
}

const Wrapper = styled(ContainerFlexRow)`
  ${({ theme }) => `
    padding: ${theme.divSpacingMedium} ${theme.divSpacingSmall};
    box-sizing: border-box;
    width: 100%;
    outline: none;
    border-bottom: 1px solid ${theme.palette.colorGray200};
    align-items: center;
    &:last-child {
      border-bottom: none;
    }
  `}
`

const Title = styled.div`
  ${({ theme }) => `
    flex-grow: 1;
    font-size: ${theme.fontSizeTitleResponsive};
    font-weight: ${theme.fontBoldTwo};
  `}
`

export const Setting: FC<Props> = ({
  title,
  options,
  onChange,
  initialValue,
}) => (
  <Wrapper>
    <Title>{title}</Title>
    <Select options={options} onChange={onChange} initialValue={initialValue} />
  </Wrapper>
)
