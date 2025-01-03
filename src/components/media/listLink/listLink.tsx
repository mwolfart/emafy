import { ContainerFlexRow, GrayIconButton, IconHeadline } from 'components/ui'
import { PlayerContext } from 'contexts/player'
import { FC, useContext } from 'react'
import { useMediaQuery } from 'react-responsive'
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
  ${({ theme }) => `
    border-top: 2px solid ${theme.palette.colorGray200};
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
  `}
`
export const MediaListLink: FC<Props> = ({ mediaInfo }) => {
  const isTablet = useMediaQuery({
    query: '(min-width: 576px)',
  })
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
        icon={isTablet ? 'fa-headphones-simple' : ''}
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
