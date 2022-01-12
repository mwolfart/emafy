import { FC } from 'react'
import styled from 'styled-components'

export type TabProps = {
  title: string
  id: string
}

const Wrapper = styled.div``

export const Tab: FC<TabProps> = ({ children }) => <Wrapper>{children}</Wrapper>
