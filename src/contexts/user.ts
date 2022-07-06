/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'
import { User } from 'types/media'
import { emptyUser } from 'utils/constants'

export type AppTheme = 'light' | 'dark'
export type AppLanguage = 'en' | 'pt-br' | 'es' | 'de'
export type AppFont = 'classic' | 'modern' | 'typewriter' | 'strong'

export type UserPreferences = {
  theme: AppTheme
  language: AppLanguage
  font: AppFont
}

export type UserContextProps = {
  user: User
  preferences: UserPreferences
  setPreferences: (value: UserPreferences) => void
}

export const UserContext = createContext<UserContextProps>({
  user: emptyUser,
  preferences: {
    theme: 'light',
    language: 'en',
    font: 'classic',
  },
  setPreferences: () => {},
})
