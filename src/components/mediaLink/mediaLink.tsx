import { GlobalProps } from 'globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Media, isAlbum, isArtist, isSong } from 'types/media'
import '@fortawesome/fontawesome-free/css/solid.min.css'

type Props = {
  mediaInfo: Media
  rowVariant?: boolean
} & GlobalProps

type StyledProps = {
  rowVariant?: boolean
} & GlobalProps

const MediaLinkBlock = styled.a<StyledProps>`
  ${({ rowVariant, theme }: StyledProps) => `
    display: flex;
    flex-direction: ${rowVariant ? 'row' : 'column'};
    font-family: ${theme?.fontStyle};
    padding: 12px;
    transition: ${theme?.transitionQuick};
    ${
      rowVariant
        ? `
    margin: 10px; 
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
      transform: scale(1.1);
        
      img {
        box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowAccent};
      }`
      }
    }

    img {
      width: ${rowVariant ? theme?.imageSizeSmall : theme?.imageSizeMedium};
      height: ${rowVariant ? theme?.imageSizeSmall : theme?.imageSizeMedium};
      ${
        rowVariant
          ? ''
          : `box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowDefault}`
      };
      background-color: ${theme?.palette.colorImageBackground};
      border-radius: ${theme?.borderRadiusDefault};
      text-align: center;
      overflow: hidden;
    }
  `}
`

const DescriptionWrapper = styled.div<StyledProps>`
  ${({ rowVariant, theme }: StyledProps) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    padding-top: ${rowVariant ? '0' : '10px'};
  `}
`

const Title = styled.h3<StyledProps>`
  ${({ theme }: StyledProps) => `
    color: ${theme?.palette.colorTextTitle};
    width: 100%;
    padding-left: 10px;
    padding-bottom: 10px;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
    margin: 0;
  `}
`

const SubTitle = styled.h4<StyledProps>`
  ${({ theme }: StyledProps) => `
    color: ${theme?.palette.colorTextDisabled};
    width: 100%;
    padding-left: 10px;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeTiny};
    margin: 0;
  `}
`

const MediaIcon = styled.i<StyledProps>`
  ${({ rowVariant, theme }: StyledProps) => `
    width: ${rowVariant ? theme?.imageSizeSmall : theme?.imageSizeMedium};
    height: ${rowVariant ? theme?.imageSizeSmall : theme?.imageSizeMedium};
    background-color: ${theme?.palette.colorImageBackground};
    border-radius: ${theme?.borderRadiusDefault};
    text-align: center;
    line-height: ${rowVariant ? theme?.imageSizeSmall : theme?.imageSizeMedium};
    color: ${theme?.palette.colorTextParagraph};
  `}
`

export const MediaLink: VFC<Props> = ({
  mediaInfo,
  rowVariant: isRowVariant,
}) => {
  const renderSubTitle = (): string => {
    if (isAlbum(mediaInfo) || isSong(mediaInfo)) {
      return mediaInfo.artists
        .map((artist: Media) => artist.name)
        .reduce((accum: string, name: string) => `${accum}, ${name}`)
    }
    if (isArtist(mediaInfo)) {
      return mediaInfo.genres.reduce(
        (accum: string, genre: string) => `${accum}, ${genre}`,
      )
    }
    return ''
  }

  const imgSrc = mediaInfo.images?.[0]

  return (
    <MediaLinkBlock href="" rowVariant={isRowVariant}>
      {imgSrc ? (
        <img src={imgSrc} alt={mediaInfo.name} />
      ) : (
        <MediaIcon className="fas fa-6x fa-record-vinyl" />
      )}
      <DescriptionWrapper rowVariant={isRowVariant}>
        <Title>{mediaInfo.name}</Title>
        <SubTitle>{renderSubTitle()}</SubTitle>
      </DescriptionWrapper>
    </MediaLinkBlock>
  )
}
