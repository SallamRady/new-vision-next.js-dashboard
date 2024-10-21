'use client'

// types
import type { ReactNode } from 'react'

import { createContext, useState } from 'react'

import type { UserLookUpsType, UserType } from '@/types/users/users-page-types'

// import packages
import useUserLookUpsData from '@/hooks/useUserLookUpsData'
import useValidationData from '@/hooks/useValidationData'
import type { validationType } from '@/types/validationType'
import useUsersData from '@/hooks/useUsersData'

export const UsersContext = createContext<UsersContextType>({
  params: '',
  formMode: 'Create',
  userLookups: undefined,
  editedUser: undefined,
  validationsRules: undefined,
  handleChangeFormMode: () => {},
  handleStoreEditedUser: () => {},
  handleChangeSearchParams: () => {},
  count_active_users: undefined,
  count_inactive_users: undefined,
  users: undefined,
  users_count: undefined,
  users_count_last_month: undefined,
  usersIsLoading: false,
  refreshUserData: () => {}
})

export const UsersContextProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [params, setParams] = useState('')
  const { data: usersResponse, isLoading: usersIsLoading, refetch: refetchUsers } = useUsersData(params)
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

  const refreshUserData = () => {
    refetchUsers()
  }

  function handleChangeSearchParams(str: string) {
    setParams(str)
  }

  // ** return component ui
  return (
    <UsersContext.Provider
      value={{
        params,
        formMode,
        editedUser,
        userLookups,
        usersIsLoading,
        validationsRules,
        refreshUserData,
        handleChangeFormMode,
        handleStoreEditedUser,
        handleChangeSearchParams,
        count_active_users: usersResponse?.count_active_users,
        count_inactive_users: usersResponse?.count_inactive_users,
        users: usersResponse?.users,
        users_count: usersResponse?.users_count,
        users_count_last_month: usersResponse?.users_count_last_month
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}

type UsersContextType = {
  params: string
  formMode: 'Create' | 'Edit'
  editedUser: UserType | undefined
  userLookups: UserLookUpsType | undefined
  validationsRules: validationType[] | undefined
  handleChangeFormMode(mode: 'Create' | 'Edit'): void
  handleStoreEditedUser(user: UserType | undefined): void
  handleChangeSearchParams(str: string): void
  count_active_users: number | undefined
  count_inactive_users: number | undefined
  users: UserType[] | undefined
  users_count: number | undefined
  users_count_last_month: number | undefined
  usersIsLoading: boolean
  refreshUserData: () => void
}
