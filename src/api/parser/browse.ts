import { RawCategory } from 'api/types/browse'
import { Category } from 'types/media'

export const parseCategory = (category: RawCategory): Category => category

export const parseCategories = (categories: RawCategory[]): Category[] =>
  categories.map((category) => parseCategory(category))
