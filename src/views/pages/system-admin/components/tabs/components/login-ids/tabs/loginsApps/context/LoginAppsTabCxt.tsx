'use client'

import type { ReactNode } from 'react'
import { createContext } from 'react'

export const LoginAppsTabCxt = createContext<LoginAppsTabCxtType>({})

export const LoginAppsTabCxtProvider = (props: PropsType) => {
  // ** declare and define component state and variables
  const { children } = props

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return <LoginAppsTabCxt.Provider value={{}}>{children}</LoginAppsTabCxt.Provider>
}

export type LoginAppsTabCxtType = {}

type PropsType = {
  children: ReactNode
}
