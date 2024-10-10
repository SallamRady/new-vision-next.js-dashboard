'use client'

// types
import type { ReactNode } from 'react'
import type { UserLookUpsType } from '@/types/users/users-page-types'

// import packages
import { createContext, useState } from 'react'
import useUserLookUpsData from '@/hooks/useUserLookUpsData'

export const UsersContext = createContext<UsersContextType>({
  formMode: 'Create',
  userLookups: undefined
})

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { data: userLookups } = useUserLookUpsData() //fetch user lookups
  const [formMode, setFormMode] = useState<'Create' | 'Edit'>('Create') //handle and store form mode

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return <UsersContext.Provider value={{ formMode, userLookups }}>{children}</UsersContext.Provider>
}

type UsersContextType = {
  formMode: 'Create' | 'Edit'
  userLookups: UserLookUpsType | undefined
}
