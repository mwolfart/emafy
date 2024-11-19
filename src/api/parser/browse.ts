import { RawCategory } from 'api/types/browse'
import { RawMediaListResponse } from 'api/types/query'
import { Category, PagedDataList } from 'types/media'

export const parseCategory = (category: RawCategory): Category => category

export const parseCategories = (categories: RawCategory[]): Category[] =>
  categories.map((category) => parseCategory(category))

export const parsePagedData = <T, U>(
  parseFn: (raw: U[]) => T[],
  pagedData: RawMediaListResponse<U>,
): PagedDataList<T> => ({
  entities: parseFn(pagedData.items),
  next: pagedData.next || null,
  total: pagedData.total,
})
