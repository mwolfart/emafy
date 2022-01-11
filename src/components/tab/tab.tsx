import { FC } from 'react'
import styled from 'styled-components'

export type TabProps = {
  title: string
}

const Wrapper = styled.div``

export const Tab: FC<TabProps> = ({ children }) => <Wrapper>{children}</Wrapper>
