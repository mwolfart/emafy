import { VFC } from 'react'
import styled from 'styled-components'

import { ProfileInfo } from './profileInfo'
import { SearchField } from './searchField'
import { GrayIconButton } from 'components/ui'
import { User } from 'types/media'
import { strings } from 'strings'

type Props = {
  user: User
}

const Wrapper = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    padding: ${theme.divSpacingMedium};
    position: fixed;
    background-color: white;
    width: calc(100% - 2 * ${theme.divSpacingMedium});
    height: calc(${theme.topbarHeight} - 2 * ${theme.divSpacingMedium});
  `}
`

const Dash = styled.div`
  ${({ theme }) => `
    border-left: 2px solid ${theme.palette.colorTextSubtitleLarge};
    margin: 5px 0;
  `}
`

const ButtonsWrapper = styled.div`
  ${({ theme }) => `
    flex-grow: 1;
    align-self: center;
    text-align: right;

    @media (max-width: 576px) {
      display: none;
    }
  `}
`

export const Topbar: VFC<Props> = ({ user }) => {
  return (
    <Wrapper>
      <ProfileInfo userInfo={user} />
      <Dash />
      <SearchField />
      <ButtonsWrapper>
        <GrayIconButton
          iconClass="fa-chart-line"
          ariaLabel={strings.components.topbar.viewStatistics}
          onClickCallback={() => {}}
        />
      </ButtonsWrapper>
    </Wrapper>
  )
}
