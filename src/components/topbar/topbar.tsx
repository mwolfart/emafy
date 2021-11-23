import { VFC } from 'react'
import styled from 'styled-components'
import { GlobalProps } from 'types/global'
import { mainStyles } from 'styles'
import { ProfileButton } from 'components/profileButton/profileButton'
import { SearchField } from 'components/searchField/searchField'
import { ChartButton } from 'components/chartButton/chartButton'

const Wrapper = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    display: flex;
    flex-direction: row;
    padding: ${theme.divSpacingMedium};
    position: fixed;
    background-color: white;
    width: calc(100% - 2 * ${theme.divSpacingMedium});
  `}
`

const Dash = styled.div`
  ${({ theme = mainStyles }: GlobalProps) => `
    border-left: 2px solid ${theme.palette.colorTextSubtitleLarge};
    margin: 5px 0;
  `}
`

export const Topbar: VFC = () => {
  const userInfo = {
    name: 'Darya Vermalen',
    image:
      'https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg',
  }

  return (
    <Wrapper>
      <ProfileButton userInfo={userInfo} />
      <Dash />
      <SearchField />
      <ChartButton />
    </Wrapper>
  )
}
