import { NextURL } from 'api/data'
import { useState, VFC } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { strings } from 'strings'
import styled from 'styled-components'
import { Media } from 'types/media'
import { ToggleDescriptor } from 'components/ui'
import { BeatLoader } from 'components/loader'
import { MediaExtraProps } from 'types/mediaExtraProps'
import { Item as MediaMenuItem } from 'components/media/menu/item/item'

type Props = {
  mediaList: Media[]
  nextURL: NextURL
  totalCount: number
  fetchMoreMedia?: () => void
  extraProps?: MediaExtraProps
}

interface IProps {
  isViewList: boolean
  isTransitioning?: boolean
}

const Wrapper = styled.div`
  ${({ theme }) => `
    height: 100%;
    margin-top: -80px;
  `}
`

const ToggleButtonWrapper = styled.div`
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
  ${({ isTransitioning, isViewList, theme }) => `
    opacity: ${isTransitioning ? '0' : '1'};
    transition: ${
      isTransitioning ? theme.transitionQuick : theme.transitionQuickDelayed
    };
    display: grid;
    grid-template-columns: ${
      isViewList ? '1fr' : 'repeat(auto-fill, minmax(max(240px, 100%/10), 1fr))'
    };
    ${!isViewList ? 'justify-items: center;' : ''}
  `}
`

export const MediaMenu: VFC<Props> = ({
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
        style={{ overflow: 'visible' }}
      >
        <ToggleButtonWrapper>
          <ToggleDescriptor
            toggleState={isViewList}
            onChangeCallback={changeView}
            labelFalse={strings.scenes.albums.grid}
            labelTrue={strings.scenes.albums.list}
          />
        </ToggleButtonWrapper>
        <MenuWrapper isTransitioning={isTransitioning} isViewList={isViewList}>
          {mediaList.map((media: Media) => (
            <MediaMenuItem
              key={media.id}
              mediaInfo={media}
              rowVariant={isViewList}
              extraProps={extraProps}
            />
          ))}
        </MenuWrapper>
      </InfiniteScroll>
    </Wrapper>
  )
}
