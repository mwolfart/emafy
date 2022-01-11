import { FC, ReactElement, useState } from 'react'
import styled from 'styled-components'
import { TabButton } from './tabButton'
import { TabProps } from './tab'

type Props = {
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
  const [activeTab, setActiveTab] = useState<string>('')

  return (
    <Wrapper>
      <TabMenu>
        {children.map((tab) => (
          <TabButton
            title={tab.props.title}
            onClick={() => setActiveTab(tab.props.title)}
            active={activeTab === tab.props.title}
          />
        ))}
      </TabMenu>
      {children.map((tab) => {
        const shouldShowContent = activeTab === tab.props.title
        return <>{shouldShowContent && tab}</>
      })}
    </Wrapper>
  )
}
