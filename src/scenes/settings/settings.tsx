import {
  getOwnFollowedUsers,
  getOwnPlaylists,
  getOwnSavedSongs,
} from 'api/data/own'
import { BeatLoader } from 'components/loader'
import { ProfileCard } from 'components/profile/card/card'
import { Setting } from 'components/setting/setting'
import {
  ContainerFlexCol,
  ContainerFlexRow,
  TitleExtraLarge,
} from 'components/ui'
import { AppFont, AppLanguage, AppTheme, UserContext } from 'contexts/user'
import { FC, useContext, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { strings } from 'strings'
import styled from 'styled-components'

const Wrapper = styled.div`
  height: 100%;
  overflow: auto;
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => `
    padding: ${theme.divSpacingBig};
    gap: ${theme.divSpacingMedium};

    @media (min-width: 768px) {
      flex-direction: row;
      gap: ${theme.divSpacingExtraBig};
      padding: ${theme.divSpacingExtraBig};
    }
  `}
`

const SettingListContainer = styled(ContainerFlexCol)`
  flex-basis: 50%;
`

export const Settings: FC = () => {
  const { user, preferences, setPreferences } = useContext(UserContext)
  const isTabletLarge = useMediaQuery({ minWidth: 768 })
  const [isLoading, setIsLoading] = useState(true)
  const [totalTracks, setTotalTracks] = useState(0)
  const [totalFollowings, setTotalFollowings] = useState(0)
  const [totalPlaylists, setTotalPlaylists] = useState(0)
  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const ownTracksRequest = getOwnSavedSongs()
      const ownFollowingsRequest = getOwnFollowedUsers()
      const ownPlaylistsRequest = getOwnPlaylists()
      const { total: countTracks } = await ownTracksRequest
      const { total: countFollowings } = await ownFollowingsRequest
      const { total: countPlaylists } = await ownPlaylistsRequest
      setTotalTracks(countTracks)
      setTotalFollowings(countFollowings)
      setTotalPlaylists(countPlaylists)
      setIsLoading(false)
    }
    fetch()
  }, [])
  const themeOptions = [
    { key: 'light', text: strings.inputs.light },
    { key: 'dark', text: strings.inputs.dark },
  ]
  const languageOptions = [
    { key: 'en', text: strings.inputs.english },
    { key: 'pt-br', text: strings.inputs.portugueseBr },
    { key: 'es', text: strings.inputs.spanish },
    { key: 'de', text: strings.inputs.german },
  ]
  const fontOptions = [
    { key: 'classic', text: strings.inputs.classic },
    { key: 'modern', text: strings.inputs.modern },
    { key: 'typewriter', text: strings.inputs.typewriter },
    { key: 'strong', text: strings.inputs.strong },
  ]

  const changeTheme = (value: AppTheme): void =>
    setPreferences({ ...preferences, theme: value })
  const changeFont = (value: AppFont): void =>
    setPreferences({ ...preferences, font: value })
  const changeLanguage = (value: AppLanguage): void =>
    setPreferences({ ...preferences, language: value })

  return isLoading ? (
    <BeatLoader />
  ) : (
    <Wrapper>
      <InnerContainer>
        {!isTabletLarge && (
          <TitleExtraLarge>{strings.headings.settings}</TitleExtraLarge>
        )}
        <ProfileCard
          user={user}
          followingCount={totalFollowings}
          savedMusicCount={totalTracks}
          playlistCount={totalPlaylists}
        />
        <SettingListContainer>
          {isTabletLarge && (
            <TitleExtraLarge>{strings.headings.settings}</TitleExtraLarge>
          )}
          <Setting
            title={strings.headings.interfaceTheme}
            options={themeOptions}
            onChange={(evt) => changeTheme(evt.target.value as AppTheme)}
            initialValue={preferences.theme}
          />
          <Setting
            title={strings.headings.language}
            options={languageOptions}
            onChange={(evt) => changeLanguage(evt.target.value as AppLanguage)}
            initialValue={preferences.language}
          />
          <Setting
            title={strings.headings.fontStyle}
            options={fontOptions}
            onChange={(evt) => changeFont(evt.target.value as AppFont)}
            initialValue={preferences.font}
          />
        </SettingListContainer>
      </InnerContainer>
    </Wrapper>
  )
}
