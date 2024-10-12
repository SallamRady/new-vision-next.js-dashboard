'use client'

// types
import type { ReactNode } from 'react'
import type { UserLookUpsType, UserType } from '@/types/users/users-page-types'

// import packages
import { createContext, useState } from 'react'
import useUserLookUpsData from '@/hooks/useUserLookUpsData'
import useValidationData from '@/hooks/useValidationData'
import { validationType } from '@/types/validationType'

export const UsersContext = createContext<UsersContextType>({
  formMode: 'Create',
  userLookups: undefined,
  editedUser: undefined,
  validationsRules: undefined,
  handleChangeFormMode: mode => {},
  handleStoreEditedUser: user => {}
})

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { data: userLookups } = useUserLookUpsData() //fetch user lookups
  const { data: validationsRules } = useValidationData() //fetch validations rules
  const [formMode, setFormMode] = useState<'Create' | 'Edit'>('Create') //handle and store form mode
  const [editedUser, setEditedUser] = useState<UserType | undefined>(undefined)

  // ** handle side effects

  // ** declare and define component helper methods
  function handleChangeFormMode(mode: 'Create' | 'Edit') {
    setFormMode(mode)
  }
  function handleStoreEditedUser(user: UserType | undefined) {
    setEditedUser(user)
  }

  // ** return component ui
  return (
    <UsersContext.Provider
      value={{
        formMode,
        editedUser,
        userLookups,
        validationsRules,
        handleChangeFormMode,
        handleStoreEditedUser
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

type UsersContextType = {
  formMode: 'Create' | 'Edit'
  editedUser: UserType | undefined
  userLookups: UserLookUpsType | undefined
  validationsRules: validationType[] | undefined
  handleChangeFormMode(mode: 'Create' | 'Edit'): void
  handleStoreEditedUser(user: UserType | undefined): void
}
