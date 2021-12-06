import { checkIfOwnFollowsArtist, getOwnFollowedUsers, NextURL } from 'api/data'
import { useEffect, useState } from 'react'
import { SimpleArtist } from 'types/media'

type UseGetUserFollowsHookReturn = {
  fetchMoreFollows: () => void
  followList: SimpleArtist[]
  nextURL: NextURL
  totalCount: number
  isLoading: boolean
}

export function useGetUserFollows(): UseGetUserFollowsHookReturn {
  const [nextURL, setNextURL] = useState<NextURL>(null)
  const [followList, setFollowList] = useState<SimpleArtist[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const checkFollowedUsers = (followList: SimpleArtist[]): Promise<void>[] =>
    followList.map((follow) =>
      checkIfOwnFollowsArtist(follow.id, 'artist').then((isFollowing) => {
        follow.isCurrentUserFollowing = isFollowing
      }),
    )

  const fetchMoreFollows = (): void => {
    getOwnFollowedUsers(nextURL).then(({ entities, next }) => {
      Promise.all(checkFollowedUsers(entities)).then(() => {
        setFollowList(followList.concat(entities))
        setNextURL(next)
      })
    })
  }

  useEffect(() => {
    getOwnFollowedUsers().then(({ entities, next, total }) => {
      Promise.all(checkFollowedUsers(entities)).then(() => {
        setTotalCount(total)
        setFollowList(entities)
        setNextURL(next)
        setIsLoading(false)
      })
    })
  }, [])

  return {
    fetchMoreFollows,
    followList,
    nextURL,
    totalCount,
    isLoading,
  }
}
