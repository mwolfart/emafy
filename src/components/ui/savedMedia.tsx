import { NextURL } from 'api/data'
import { VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Menu as MediaMenu } from 'components/media/menu/menu'
import { strings } from 'strings'
import styled from 'styled-components'
import { mainStyles } from 'styles'
import { GlobalProps as StyledProps } from 'types/global'
import { Media } from 'types/media'
import { ToggleDescriptor } from '.'
import { SubtitleLarge, TitleLarge } from './heading'

type MenuWrapperProps = {
  isTransitioning?: boolean
} & StyledProps

type Props = {
  mediaList: Media[]
  mediaTitle: string
  mediaCountLabel: string
  totalCount: number
  nextURL: NextURL
  isViewList: boolean
  isTransitioning: boolean
  fetchMoreMedia: () => void
  changeView: (isGrid: boolean) => void
}

const Header = styled.div<StyledProps>`
  ${({ theme = mainStyles }: StyledProps) => `
        display: flex;
        flex-direction: row;
        height: 20%;
        padding: ${theme.divSpacingMedium} ${theme.divSpacingBig};
        font-family: ${theme.fontStyle};
    `}
`

const TitleWrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const MenuWrapper = styled.div<MenuWrapperProps>`
  ${({ isTransitioning, theme = mainStyles }: MenuWrapperProps) => `
        padding-left: ${theme.divSpacingMedium};
        padding-right: ${theme.divSpacingMedium};
        opacity: ${isTransitioning ? '0' : '1'};
        transition: ${
          isTransitioning ? theme.transitionQuick : theme.transitionQuickDelayed
        };
    `}
`

export const SavedMedia: VFC<Props> = ({
  mediaList,
  mediaTitle,
  mediaCountLabel,
  fetchMoreMedia,
  totalCount,
  nextURL,
  isViewList,
  changeView,
  isTransitioning,
}: Props) => (
  <InfiniteScroll
    dataLength={mediaList.length}
    next={fetchMoreMedia}
    hasMore={mediaList.length < totalCount && nextURL !== null}
    loader={'Loading...'}
  >
    <Header>
      <TitleWrapper>
        <TitleLarge>{mediaTitle}</TitleLarge>
        <SubtitleLarge>{`${totalCount} ${mediaCountLabel}`}</SubtitleLarge>
      </TitleWrapper>
      <ToggleDescriptor
        toggleState={isViewList}
        onChangeCallback={changeView}
        labelFalse={strings.scenes.albums.grid}
        labelTrue={strings.scenes.albums.list}
      />
    </Header>
    <MenuWrapper isTransitioning={isTransitioning}>
      <MediaMenu mediaList={mediaList} rowVariant={isViewList} />
    </MenuWrapper>
  </InfiniteScroll>
)
