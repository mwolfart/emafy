import { NextURL } from 'api/data'
import { useState, VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Group as MediaGroup } from 'components/media/menu/group/group'
import { strings } from 'strings'
import styled from 'styled-components'
import { Media } from 'types/media'
import { ToggleDescriptor } from 'components/ui'
import { BeatLoader } from 'components/loader'
import { MediaExtraProps } from 'types/mediaExtraProps'

type Props = {
  mediaList: Media[]
  nextURL: NextURL
  totalCount: number
  fetchMoreMedia?: () => void
  extraProps?: MediaExtraProps
}

interface IProps {
  isTransitioning?: boolean
}

const Wrapper = styled.div`
  ${({ theme }) => `
    height: 100%;
    overflow-y: scroll;
    margin-top: -80px;
  `}
`

const Header = styled.div`
  ${({ theme }) => `
    display: flex;
    flex-direction: row;
    height: 20%;
    padding: ${theme.divSpacingMedium} 0;
    font-family: ${theme.fontStyle};
    justify-content: right;
  `}
`

const MenuWrapper = styled.div<IProps>`
  ${({ isTransitioning, theme }) => `
    opacity: ${isTransitioning ? '0' : '1'};
    transition: ${
      isTransitioning ? theme.transitionQuick : theme.transitionQuickDelayed
    };
  `}
`

export const Page: VFC<Props> = ({
  fetchMoreMedia,
  mediaList,
  nextURL,
  totalCount,
  extraProps,
}: Props) => {
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  const [isViewList, setIsViewList] = useState<boolean>(true)
  let transitionTimeout: NodeJS.Timeout

  const changeView = (isGrid: boolean): void => {
    setTransitioning(true)
    clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout((): void => {
      setIsViewList(isGrid)
      setTransitioning(false)
    }, 250)
  }

  const nextFn = fetchMoreMedia || (() => {})

  return (
    <Wrapper>
      <InfiniteScroll
        dataLength={mediaList.length}
        next={nextFn}
        hasMore={mediaList.length < totalCount && nextURL !== null}
        loader={<BeatLoader />}
        scrollableTarget="mainScreenWrapper"
      >
        <Header>
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
    </Wrapper>
  )
}
