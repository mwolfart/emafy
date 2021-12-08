import React, { VFC } from 'react'
import styled from 'styled-components'

import { ContainerFlexRow, Headline } from '..'

type Props = {
  title: string
  icon: string
  subtitle?: string
}

const Icon = styled.i`
  ${({ theme }) => `
    color: ${theme.palette.colorPrimary};
    background-color: ${theme.palette.colorTertiary};
    border-radius: ${theme.borderRadiusSmall};
    text-align: center;
    align-self: center;
    padding: ${theme.divSpacingMedium};
    margin-right: ${theme.divSpacingMedium};
    border-radius: ${theme.borderRadiusLarge};
  `}
`

export const IconHeadline: VFC<Props> = ({ title, icon, subtitle }) => (
  <ContainerFlexRow>
    <Icon className={'fa ' + icon} />
    <Headline title={title} subtitle={subtitle} />
  </ContainerFlexRow>
)
