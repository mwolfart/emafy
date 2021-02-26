import { GlobalProps } from 'globalProps'
import { VFC } from 'react'
import styled from 'styled-components'
import { Album, Media } from 'types/media'

type Props = {
  mediaInfo: Media
  rowVariant?: boolean
} & GlobalProps

type LinkBlockProps = {
  rowVariant?: boolean
} & GlobalProps

const MediaLinkBlock = styled.a<LinkBlockProps>`
  display: flex;
  flex-direction: ${(props: LinkBlockProps) =>
    props.rowVariant ? 'row' : 'column'};
  font-family: ${(props: LinkBlockProps) => props.theme?.fontStyle};
  text-decoration: unset;
  padding: 10px;
  transition: 0.3s ease;
  transform: scale(1);
  ${(props: LinkBlockProps) =>
    props.rowVariant
      ? `
  margin: 10px;
  border-radius: 16px;
  background-color: ${props.theme?.colorDarkerBackground};
  `
      : `
  max-width: 210px;
  `}

  &:hover {
    transition: 0.3s ease;
    ${(props: LinkBlockProps) =>
      props.rowVariant
        ? `background-color: ${props.theme?.colorDarkerBackgroundHover};`
        : `
      transform: scale(1.1);
      
      img {
        box-shadow: 0px 60px 80px #00000045;
      }`}
  }

  img {
    width: ${(props: LinkBlockProps) => (props.rowVariant ? '100px' : '200px')};
    height: ${(props: LinkBlockProps) =>
      props.rowVariant ? '100px' : '200px'};
    ${(props: LinkBlockProps) =>
      props.rowVariant ? '' : 'box-shadow: 0px 60px 80px #0000002a'};
    background-color: ${(props: LinkBlockProps) =>
      props.theme?.colorImageBackground};
    border-radius: 16px;
    border-width: 0px;
    line-height: ${(props: LinkBlockProps) =>
      props.rowVariant ? '50px' : '200px'};
    text-align: center;
    overflow: hidden;
  }
`

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  font-weight: 600;
`

const Title = styled.h3`
  color: ${(props: GlobalProps) => props.theme?.colorTextTitle};
  width: 100%;
  padding-left: 10px;
  text-align: left;
  font-weight: 600;
  font-size: 16px;
  line-height: 36px;
  margin: 0;
`

const SubTitle = styled.h4`
  color: ${(props: GlobalProps) => props.theme?.colorTextDisabled};
  width: 100%;
  padding-left: 10px;
  text-align: left;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  margin: 0;
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
