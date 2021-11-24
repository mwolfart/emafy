import { useEffect, useState, VFC } from 'react'
import styled from 'styled-components'
import { GlobalProps } from 'types/global'
import { mainStyles } from 'styles'
import { ProfileButton } from 'components/profileButton/profileButton'
import { SearchField } from 'components/searchField/searchField'
import { ChartButton } from 'components/chartButton/chartButton'
import { getUserProfile } from 'api/data'
import { User } from 'types/media'

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
  const emptyUser = {
    country: '',
    name: '',
    email: '',
    id: '',
    images: [],
  }
  const [userInfo, setUserInfo] = useState<User>(emptyUser)

  useEffect(() => {
    getUserProfile().then((userData) => {
      setUserInfo(userData)
    })
  }, [])

  return (
    <Wrapper>
      <ProfileButton userInfo={userInfo} />
      <Dash />
      <SearchField />
      <ChartButton />
    </Wrapper>
  )
}
