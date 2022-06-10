import { FC, ReactElement, ReactNode, useState } from 'react'
import styled from 'styled-components'
import { TabButton } from './tabButton'
interface TabProps {
  id: string
  title: string
  children: ReactNode
}

export const Tab: FC<TabProps> = ({ children }) => <>{children}</>

interface Props {
  children: ReactElement<TabProps>[]
}

const Wrapper = styled.div`
  ${({ theme }) => `
    padding: 0 ${theme.divSpacingExtraBig};
  `}
`

const TabMenu = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 0;
`

export const TabGroup: FC<Props> = ({ children }) => {
  const tabId = (children.length && children[0].props.id) || ''
  const [activeTab, setActiveTab] = useState<string>(tabId)

  return (
    <Wrapper>
      <TabMenu>
        {children.map((tab) => (
          <TabButton
            title={tab.props.title}
            key={tab.props.id}
            onClick={() => setActiveTab(tab.props.id)}
            active={activeTab === tab.props.id}
          />
        ))}
      </TabMenu>
      {children.map((tab) => {
        const shouldShowContent = activeTab === tab.props.id
        return shouldShowContent && tab
      })}
    </Wrapper>
  )
}
