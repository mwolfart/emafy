import { useEffect, useState } from 'react'
import { strings } from 'strings'
import { NextURL } from 'types/api/apiData'
import { MediaListQuery, MediaListResponse } from 'types/mediaQuery'

export function useGetMediaList<T>(
  getFunction: (next?: NextURL) => Promise<MediaListResponse<T>>,
): MediaListQuery<T> {
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
    let aborted = false
    const fetch = async (): Promise<void> => {
      try {
        const { entities, next, total } = await getFunction()
        if (!aborted) {
          setMediaList(entities)
          setTotalCount(total)
          setNextURL(next)
        }
      } catch (error) {
        !aborted && alert(strings.hooks.useGetSavedMedia.errorFetchingData)
      }
      !aborted && setIsLoading(false)
    }
    fetch()
    return () => {
      aborted = true
    }
  }, [getFunction])

  return {
    fetchMoreMedia,
    mediaList,
    nextURL,
    totalCount,
    isLoading,
  }
}
