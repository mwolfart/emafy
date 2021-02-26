import { GlobalProps } from 'globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Album, Media } from 'types/media'

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
    text-decoration: unset;
    padding: 10px;
    transition: ${theme?.transitionQuick};
    transform: scale(1);
    ${
      rowVariant
        ? `
    margin: 10px; 
    border-radius: ${theme?.borderRadiusDefault};
    background-color: ${theme?.palette.colorDarkerBackground};`
        : `
    max-width: 210px;`
    }

    &:hover {
      transition: ${theme?.transitionQuick};
      ${
        rowVariant
          ? `
      background-color: ${theme?.palette.colorDarkerBackgroundHover};`
          : `
      transform: scale(1.1);
        
      img {
        box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowAccent};
      }`
      }
    }

    img {
      width: ${rowVariant ? '100px' : '200px'};
      height: ${rowVariant ? '100px' : '200px'};
      ${
        rowVariant
          ? ''
          : `box-shadow: ${theme?.shadowDimensionsDefault} ${theme?.shadowDefault}`
      };
      background-color: ${theme?.palette.colorImageBackground};
      border-radius: ${theme?.borderRadiusDefault};
      border-width: 0;
      line-height: ${rowVariant ? '50px' : '200px'};
      text-align: center;
      overflow: hidden;
    }
  `}
`

const DescriptionWrapper = styled.div<StyledProps>`
  ${({ theme }: StyledProps) => `
    display: flex;
    flex-direction: column;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
  `}
`

const Title = styled.h3<StyledProps>`
  ${({ theme }: StyledProps) => `
    color: ${theme?.palette.colorTextTitle};
    width: 100%;
    padding-left: 10px;
    text-align: left;
    font-weight: ${theme?.fontBoldTwo};
    font-size: ${theme?.fontSizeParagraph};
    line-height: 36px;
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
  return (
    <MediaLinkBlock href="" rowVariant={isRowVariant}>
      <img src={mediaInfo.images && mediaInfo.images[0]} alt={mediaInfo.name} />
      <DescriptionWrapper>
        <Title>{mediaInfo.name}</Title>
        {(mediaInfo as Album).artists && (
          <SubTitle>
            {(mediaInfo as Album).artists
              .map((artist: Media) => artist.name)
              .reduce((accum: String, name: String) => `${accum}, ${name}`)}
          </SubTitle>
        )}
      </DescriptionWrapper>
    </MediaLinkBlock>
  )
}
