import React, { FC } from 'react'
import styled from 'styled-components'

import { ContainerFlexRow, Headline } from '..'

interface Props {
  title: string
  icon: string
  subtitle?: string
  smaller?: boolean
}

interface StyledProps {
  smaller?: boolean
}

const Icon = styled.i<StyledProps>`
  ${({ smaller, theme }) => `
    color: ${theme.palette.colorPrimary};
    background-color: ${theme.palette.colorTertiary};
    border-radius: ${theme.borderRadiusSmall};
    text-align: center;
    align-self: center;
    padding: ${smaller ? theme.divSpacingSmall : theme.divSpacingMedium};
    margin-right: ${theme.divSpacingMedium};
    border-radius: ${theme.borderRadiusLarge};
  `}
`

export const IconHeadline: FC<Props> = ({ title, icon, subtitle, smaller }) => (
  <ContainerFlexRow>
    <Icon className={'fa ' + icon} smaller={smaller} />
    <Headline title={title} subtitle={subtitle} smaller={smaller} />
  </ContainerFlexRow>
)
