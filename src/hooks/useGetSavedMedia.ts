import { MediaListResponse, NextURL } from 'api/data'
import { useEffect, useState } from 'react'
import { strings } from 'strings'
import { cancellableRequest } from '../api/utils'

type UseGetSavedMediaHookReturn<T> = {
  changeView: (isGrid: boolean) => void
  fetchMoreMedia: () => void
  isTransitioning: boolean
  isViewList: boolean
  mediaList: T[]
  nextURL: NextURL
  totalCount: number
  isLoading: boolean
}

export function useGetSavedMedia<T>(
  getFunction: (next?: NextURL) => Promise<MediaListResponse<T>>,
): UseGetSavedMediaHookReturn<T> {
  const [isViewList, setIsViewList] = useState<boolean>(true)
  const [isTransitioning, setTransitioning] = useState<boolean>(false)
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [mediaList, setMediaList] = useState<T[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
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
    return cancellableRequest(
      getFunction,
      ({ entities, next, total }) => {
        setMediaList(entities)
        setTotalCount(total)
        setNextURL(next)
        setIsLoading(false)
      },
      () => {
        alert(strings.hooks.useGetSavedMedia.errorFetchingData)
      },
      () => {
        setIsLoading(false)
      },
    )
  }, [getFunction])

  return {
    changeView,
    fetchMoreMedia,
    isTransitioning,
    isViewList,
    mediaList,
    nextURL,
    totalCount,
    isLoading,
  }
}
