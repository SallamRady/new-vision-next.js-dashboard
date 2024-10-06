'use client'

import { LoginWayType } from '@/types/login-way'
import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

export const LoginAppsTabCxt = createContext<LoginAppsTabCxtType>({})

export const LoginAppsTabCxtProvider = (props: PropsType) => {
  // ** declare and define component state and variables
  const { children } = props
  const [formMode, setFormMode] = useState<'Create' | 'Edit'>('Create')
  const [edittedLoginWay, setEdittedLoginWay] = useState<undefined | LoginWayType>(undefined)

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return <LoginAppsTabCxt.Provider value={{}}>{children}</LoginAppsTabCxt.Provider>
}

export type LoginAppsTabCxtType = {}

type PropsType = {
  children: ReactNode
}
