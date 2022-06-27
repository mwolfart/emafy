import { ContainerFlexRow, GrayIconButton, IconHeadline } from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { FC, useContext } from 'react'
import styled from 'styled-components'
import { isArtist, SimpleArtist, Song } from 'types/media'
import {
  abbreviateText,
  artistListToString,
  nameListToString,
} from 'utils/utils'

interface Props {
  mediaInfo: Song | SimpleArtist
}

const Wrapper = styled(ContainerFlexRow)`
  border-top: 2px solid #ddd;
  align-items: center;
  &:first-child {
    border-top: none;
  }
  & > :first-child {
    flex-grow: 1;
  }
  & > button {
    align-items: center;
  }
`
export const MediaListLink: FC<Props> = ({ mediaInfo }) => {
  const playerContext = useContext(PlayerContext)
  const subtitle = isArtist(mediaInfo)
    ? nameListToString(mediaInfo.genres)
    : artistListToString(mediaInfo.artists)
  const title = abbreviateText(mediaInfo.name, 40)
  const abbrSubtitle = abbreviateText(subtitle, 20)
  const playMedia = (): void =>
    isArtist(mediaInfo)
      ? playerContext.playArtist(mediaInfo.id)
      : playerContext.playSong(mediaInfo.id)
  return (
    <Wrapper>
      <IconHeadline
        icon="fa-headphones-simple"
        title={title}
        subtitle={abbrSubtitle}
        smaller={true}
      />
      <GrayIconButton
        iconClass="fa-play fa-1x"
        onClickCallback={playMedia}
        hasRoundBorder={true}
      />
    </Wrapper>
  )
}
