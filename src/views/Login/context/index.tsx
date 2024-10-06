'use client'

import { TenentType } from '@/types/tenant'
import { existInLocalStorage, StoreInLocalStorage } from '@/utils/local.storage'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { createContext, useState, useEffect } from 'react'

export enum LoginPageViews {
  MAIN_PAGE = 'login',
  Multi_TENANTS = 'Multi_TENANTS',
  PASSWORD = 'password',
  OTP = 'OTP',
  LoggedIn = 'LoggedIn',
  SetPassword = 'SetPassword'
}

export const AuthOperationsContext = createContext<AuthOperationsContextType>({
  view: LoginPageViews.MAIN_PAGE,
  handleChangeView: _view => {},
  tenants: [],
  storeTenants: _tenants => {},
  globalId: -1,
  storeGlobalId: id => {},
  selectedTenant: undefined,
  storeSelectedTenant: tenant => {},
  handleSetPassword: set => {},
  setPassword: false
})

export const AuthOperationsContextProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [globalId, setGlobalId] = useState(-1)
  const [tenants, setTenants] = useState<TenentType[]>([])
  const [setPassword, setSetPassword] = useState(false)
  const [view, setView] = useState<LoginPageViews>(LoginPageViews.MAIN_PAGE)
  const [selectedTenant, setSelectedTenant] = useState<TenentType | undefined>(undefined)

  // ** handle side effects
  useEffect(() => {
    if (existInLocalStorage('token')) {
      return redirect('/home')
    }
  }, [])
  // ** declare and define component helper methods
  function handleSetPassword(set: boolean) {
    setSetPassword(set)
  }

  function handleChangeView(_view: LoginPageViews) {
    setView(_view)
  }

  function storeTenants(_tenants: TenentType[]) {
    setTenants(_tenants)
  }

  function storeGlobalId(id: number) {
    setGlobalId(id)
  }

  function storeSelectedTenant(tenant: TenentType) {
    StoreInLocalStorage('xTenentId', tenant.id.toString())
    setSelectedTenant(tenant)
  }

  // ** return component ui
  return (
    <AuthOperationsContext.Provider
      value={{
        selectedTenant,
        storeSelectedTenant,
        globalId,
        view,
        setPassword,
        handleChangeView,
        tenants,
        storeTenants,
        storeGlobalId,
        handleSetPassword
      }}
    >
      {children}
    </AuthOperationsContext.Provider>
  )
}

type AuthOperationsContextType = {
  view: LoginPageViews
  tenants: TenentType[]
  globalId: number
  setPassword: boolean
  storeGlobalId(id: number): void
  selectedTenant: TenentType | undefined
  storeTenants(_tenants: TenentType[]): void
  handleChangeView(_view: LoginPageViews): void
  storeSelectedTenant(tenant: TenentType): void
  handleSetPassword(set: boolean): void
}
