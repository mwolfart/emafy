import { MediaListResponse, NextURL } from 'api/data'
import { useEffect, useState } from 'react'
import { strings } from 'strings'
import { cancellableRequest } from '../api/utils'

type UseGetSavedMediaHookReturn<T> = {
  fetchMoreMedia: () => void
  mediaList: T[]
  nextURL: NextURL
  totalCount: number
  isLoading: boolean
}

export function useGetSavedMedia<T>(
  getFunction: (next?: NextURL) => Promise<MediaListResponse<T>>,
): UseGetSavedMediaHookReturn<T> {
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [mediaList, setMediaList] = useState<T[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

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
    fetchMoreMedia,
    mediaList,
    nextURL,
    totalCount,
    isLoading,
  }
}
