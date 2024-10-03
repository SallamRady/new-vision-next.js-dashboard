'use client'

import { TenentType } from '@/types/tenant'
import type { ReactNode } from 'react'
import { createContext, useState, useEffect } from 'react'

export enum LoginPageViews {
  MAIN_PAGE = 'login',
  Multi_TENANTS = 'Multi_TENANTS',
  PASSWORD = 'password',
  OTP = 'OTP'
}

export const AuthOperationsContext = createContext<AuthOperationsContextType>({
  view: LoginPageViews.MAIN_PAGE,
  handleChangeView: _view => {},
  tenants: [],
  storeTenants: _tenants => {}
})

export const AuthOperationsContextProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [tenants, setTenants] = useState<TenentType[]>([])
  const [view, setView] = useState<LoginPageViews>(LoginPageViews.MAIN_PAGE)
  // ** handle side effects
  // ** declare and define component helper methods
  function handleChangeView(_view: LoginPageViews) {
    setView(_view)
  }

  function storeTenants(_tenants: TenentType[]) {
    setTenants(_tenants)
  }

  // ** return component ui
  return (
    <AuthOperationsContext.Provider value={{ view, handleChangeView, tenants, storeTenants }}>
      {children}
    </AuthOperationsContext.Provider>
  )
}

type AuthOperationsContextType = {
  view: LoginPageViews
  tenants: TenentType[]
  storeTenants(_tenants: TenentType[]): void
  handleChangeView(_view: LoginPageViews): void
}
