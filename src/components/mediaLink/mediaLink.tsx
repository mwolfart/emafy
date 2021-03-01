import { GlobalProps } from 'globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Album, Media, SimpleArtist } from 'types/media'

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

export const MediaLink: VFC<Props> = ({
  mediaInfo,
  rowVariant: isRowVariant,
}) => {
  const renderSubTitle = (): string => {
    if (mediaInfo.type === 'album' || mediaInfo.type === 'song') {
      return (mediaInfo as Album).artists
        .map((artist: Media) => artist.name)
        .reduce((accum: string, name: string) => `${accum}, ${name}`)
    }
    if (mediaInfo.type === 'artist') {
      return (mediaInfo as SimpleArtist).genres.reduce(
        (accum: string, genre: string) => `${accum}, ${genre}`,
      )
    }
    return ''
  }

  const imgSrc = mediaInfo.images?.[0] ?? ''

  return (
    <MediaLinkBlock href="" rowVariant={isRowVariant}>
      <img src={imgSrc} alt={mediaInfo.name} />
      <DescriptionWrapper rowVariant={isRowVariant}>
        <Title>{mediaInfo.name}</Title>
        <SubTitle>{renderSubTitle()}</SubTitle>
      </DescriptionWrapper>
    </MediaLinkBlock>
  )
}
