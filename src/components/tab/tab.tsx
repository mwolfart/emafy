import { FC, ReactNode } from 'react'
import styled from 'styled-components'

export type TabProps = {
  title: string
  id: string
  children: ReactNode
}

const Wrapper = styled.div``

export const Tab: FC<TabProps> = ({ children }) => <Wrapper>{children}</Wrapper>
