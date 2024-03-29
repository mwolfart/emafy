import { useContext, FC } from 'react'
import styled from 'styled-components'
import { Media, MediaType } from 'types/media'
import { MediaDescription } from '../description/description'
import { MediaImage } from '../image/image'
import { strings } from 'strings'
import { Link as RouterLink } from 'react-router-dom'
import { MediaExtraProps } from 'types/mediaExtraProps'
import { PlayerContext } from 'contexts/player'

interface Props {
  mediaInfo: Media
  rowVariant?: boolean
  extraProps?: MediaExtraProps
}

interface StyledProps {
  rowVariant?: boolean
}

const TileWrapper = styled.div<StyledProps>`
  ${({ rowVariant, theme }) => `
    display: flex;
    flex-direction: ${rowVariant ? 'row' : 'column'};
    box-sizing: border-box;
    font-family: ${theme.fontStyle};
    padding: ${theme.divSpacingSmall};
    transition: ${theme.transitionQuick};
    ${
      rowVariant
        ? `
    margin: ${theme.divSpacingSmall} 0; 
    border-radius: ${theme.borderRadiusDefault};
    background-color: ${theme.palette.colorGray100};`
        : `
    width: 200px;`
    }

    @media (max-width: 576px) {
      flex-direction: column;
    }

    &:hover {
      transition: ${theme.transitionQuick};
      ${
        rowVariant
          ? `
      background-color: ${theme.palette.colorGray200};`
          : `
      transform: scale(1.1);`
      }
    }

    div + div {
      padding-top: ${rowVariant ? '0' : theme.divSpacingSmall};
    }
  `}
`

const SimpleLink = styled.div`
  cursor: pointer;
`

export const MediaLink: FC<Props> = ({
  mediaInfo,
  rowVariant: isRowVariant,
  extraProps,
}) => {
  const imgSrc = mediaInfo.images?.[0]
  const faSize = isRowVariant ? 'fa-3x' : 'fa-6x'
  const linkRedirectURL = `/${mediaInfo.mediaType}/${mediaInfo.id}`
  const placeholder = (
    <i
      className={`fas ${faSize} fa-record-vinyl`}
      aria-label={strings.components.media.noCoverImage}
    />
  )
  const playerContext = useContext(PlayerContext)

  const mediaTile = (
    <TileWrapper rowVariant={isRowVariant}>
      <MediaImage src={imgSrc} small={isRowVariant} placeholder={placeholder} />
      <MediaDescription mediaInfo={mediaInfo} rowVariant={isRowVariant} />
    </TileWrapper>
  )

  switch (mediaInfo.mediaType) {
    case MediaType.artist:
      return <RouterLink to={linkRedirectURL}>{mediaTile}</RouterLink>
    case MediaType.album: {
      const albumClickCallback = (): void =>
        extraProps && extraProps.mediaSnippetOpenCallback
          ? extraProps.mediaSnippetOpenCallback(mediaInfo)
          : playerContext.playAlbum(mediaInfo.id)
      return <SimpleLink onClick={albumClickCallback}>{mediaTile}</SimpleLink>
    }
    case MediaType.playlist: {
      const playlistClickCallback = (): void =>
        extraProps && extraProps.mediaSnippetOpenCallback
          ? extraProps.mediaSnippetOpenCallback(mediaInfo)
          : playerContext.playPlaylist(mediaInfo.id)
      return (
        <SimpleLink onClick={playlistClickCallback}>{mediaTile}</SimpleLink>
      )
    }
    default: {
      const songClickCallback = (): void => playerContext.playSong(mediaInfo.id)
      return <SimpleLink onClick={songClickCallback}>{mediaTile}</SimpleLink>
    }
  }
}
