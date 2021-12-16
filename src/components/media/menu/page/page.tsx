import { NextURL } from 'api/data'
import { VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Group as MediaGroup } from 'components/media/menu/group/group'
import { strings } from 'strings'
import styled from 'styled-components'
import { Media } from 'types/media'
import { ToggleDescriptor } from '../../../ui'
import { SubtitleLarge, TitleLarge } from '../../../ui/heading'
import { BeatLoader } from 'components/loader'
import { MediaExtraProps } from 'types/mediaExtraProps'

type Props = {
  changeView: (isGrid: boolean) => void
  fetchMoreMedia: () => void
  isTransitioning: boolean
  isViewList: boolean
  mediaCountLabel: string
  mediaList: Media[]
  pageTitle: string
  nextURL: NextURL
  totalCount: number
  extraProps?: MediaExtraProps
}

interface IProps {
  isTransitioning?: boolean
}

const Header = styled.div`
  ${({ theme }) => `
        display: flex;
        flex-direction: row;
        height: 20%;
        padding: ${theme.divSpacingMedium} ${theme.divSpacingBig};
        font-family: ${theme.fontStyle};
    `}
`

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const MenuWrapper = styled.div<IProps>`
  ${({ isTransitioning, theme }) => `
        padding-left: ${theme.divSpacingMedium};
        padding-right: ${theme.divSpacingMedium};
        opacity: ${isTransitioning ? '0' : '1'};
        transition: ${
          isTransitioning ? theme.transitionQuick : theme.transitionQuickDelayed
        };
    `}
`

export const Page: VFC<Props> = ({
  changeView,
  fetchMoreMedia,
  isTransitioning,
  isViewList,
  mediaCountLabel,
  mediaList,
  pageTitle,
  nextURL,
  totalCount,
  extraProps,
}: Props) => (
  <InfiniteScroll
    dataLength={mediaList.length}
    next={fetchMoreMedia}
    hasMore={mediaList.length < totalCount && nextURL !== null}
    loader={<BeatLoader />}
  >
    <Header>
      <TitleWrapper>
        <TitleLarge>{pageTitle}</TitleLarge>
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
      <MediaGroup
        mediaList={mediaList}
        rowVariant={isViewList}
        extraProps={extraProps}
      />
    </MenuWrapper>
  </InfiniteScroll>
)
