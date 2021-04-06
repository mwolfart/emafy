import { MediaListResponse, NextURL } from 'api/data'
import { useEffect, useState } from 'react'
import { strings } from 'strings'

type HookReturn<T> = {
  mediaList: T[]
  totalCount: number
  nextURL: NextURL
  isViewList: boolean
  isTransitioning: boolean
  fetchMoreMedia: () => void
  changeView: (isGrid: boolean) => void
}

export function useGetSavedMedia<T>(
  getFunction: (next?: NextURL) => Promise<MediaListResponse<T>>,
): HookReturn<T> {
  const [isViewList, setIsViewList] = useState<boolean>(true)
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [mediaList, setMediaList] = useState<T[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  let transitionTimeout: NodeJS.Timeout

  const changeView = (isGrid: boolean): void => {
    setTransitioning(true)
    clearTimeout(transitionTimeout)
    transitionTimeout = setTimeout((): void => {
      setIsViewList(isGrid)
      setTransitioning(false)
    }, 250)
  }

  const fetchMoreMedia = (): void => {
    getFunction(nextURL).then(({ entities, next }) => {
      setMediaList(mediaList.concat(entities))
      setNextURL(next)
    })
  }

  useEffect(() => {
    getFunction()
      .then(({ entities, next, total }) => {
        setMediaList(entities)
        setTotalCount(total)
        setNextURL(next)
      })
      .catch(() => {
        alert(strings.hooks.useGetSavedMedia.errorFetchingData)
      })
  }, [getFunction])

  return {
    mediaList,
    totalCount,
    nextURL,
    isViewList,
    isTransitioning,
    fetchMoreMedia,
    changeView,
  }
}
