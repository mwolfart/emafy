import { VFC } from 'react'
import styled from 'styled-components'
import { Media, MediaType } from 'types/media'
import { Description as MediaDescription } from '../description/description'
import { Image as MediaImage } from '../image/image'
import { strings } from 'strings'
import { Link as RouterLink } from 'react-router-dom'
import { MediaExtraProps } from 'types/mediaExtraProps'

type Props = {
  mediaInfo: Media
  rowVariant?: boolean
  extraProps?: MediaExtraProps
}

interface IProps {
  rowVariant?: boolean
}

const TileWrapper = styled.div<IProps>`
  ${({ rowVariant, theme }) => `
    display: flex;
    flex-direction: ${rowVariant ? 'row' : 'column'};
    font-family: ${theme?.fontStyle};
    padding: ${theme?.divSpacingSmall};
    transition: ${theme?.transitionQuick};
    ${
      rowVariant
        ? `
    margin: ${theme?.divSpacingSmall}; 
    border-radius: ${theme?.borderRadiusDefault};
    background-color: ${theme?.palette.colorLinkBackground};`
        : `
    max-width: 210px;`
    }

    &:hover {
      transition: ${theme?.transitionQuick};
      ${
        rowVariant
          ? `
      background-color: ${theme?.palette.colorLinkBackgroundHover};`
          : `
      transform: scale(1.1);`
      }
    }

    div + div {
      padding-top: ${rowVariant ? '0' : theme?.divSpacingSmall};
    }
  `}
`

const SimpleLink = styled.div`
  cursor: pointer;
`

export const Link: VFC<Props> = ({
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
      aria-label={strings.components.media.image.unavailable}
    />
  )

  const mediaTile = (
    <TileWrapper rowVariant={isRowVariant}>
      <MediaImage src={imgSrc} small={isRowVariant} placeholder={placeholder} />
      <MediaDescription mediaInfo={mediaInfo} />
    </TileWrapper>
  )

  switch (mediaInfo.mediaType) {
    case MediaType.artist:
      return <RouterLink to={linkRedirectURL}>{mediaTile}</RouterLink>
    case MediaType.album:
      const clickCallback = (): void =>
        extraProps &&
        extraProps.mediaSnippetOpenCallback &&
        extraProps.mediaSnippetOpenCallback(mediaInfo)
      return <SimpleLink onClick={clickCallback}>{mediaTile}</SimpleLink>
    default:
      return <>{mediaTile}</>
  }
}