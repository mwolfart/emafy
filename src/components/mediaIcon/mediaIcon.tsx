import { GlobalProps } from 'globalProps'
import { VFC } from 'react'
import { strings } from 'strings'
import styled from 'styled-components'

export type Props = {
  iconSize: string
  iconClass: string
  iconLabel?: string
} & GlobalProps

export type StyledProps = {
  size: string
} & GlobalProps

export const Wrapper = styled.div<StyledProps>`
  ${({ size, theme }: StyledProps) => `
    width: ${size};
    height: ${size};
    display: flex;
    flex-direction: column;
    background-color: ${theme?.palette.colorImageBackground};
    border-radius: ${theme?.borderRadiusDefault};
    justify-content: center;
    text-align: center;
    color: ${theme?.palette.colorTextParagraph};
  `}
`

export const MediaIcon: VFC<Props> = ({ iconSize, iconClass, iconLabel }) => (
  <Wrapper size={iconSize}>
    <i className={iconClass} aria-label={iconLabel} />
  </Wrapper>
)
