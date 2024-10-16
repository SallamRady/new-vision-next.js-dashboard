'use client'

import useCompaniesData from '@/hooks/useCompaniesData'
import useCompaniesLookups from '@/hooks/useCompaniesLookups'
import { CompaniesLookUpsType, TenantType } from '@/types/companies/CompanyTableRowType'
// types
import type { ReactNode } from 'react'

// import packages
import { createContext, useState } from 'react'

export const ComponiesCxt = createContext<ComponiesCxtType>({
  params: '',
  handleChangeParams: str => {},
  companiesLookupsData: undefined,
  companiesData: undefined,
  handleRefreshCompaniesData: () => {},
  handleChangeCompaniesParams: (str: string) => {}
})

export const ComponiesCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [params, setParams] = useState('')
  const [companiesParams, setCompaniesParams] = useState('')
  const { data: companiesData, refetch: refreshCompaniesData } = useCompaniesData(companiesParams)
  const { data: companiesLookupsData } = useCompaniesLookups(params)

  // ** handle side effects

  // ** declare and define component helper methods
  const handleChangeParams = (str: string) => {
    setParams(str)
  }

  const handleChangeCompaniesParams = (str: string) => {
    setCompaniesParams(str)
  }

  const handleRefreshCompaniesData = () => {
    refreshCompaniesData()
  }

  // ** return component ui
  return (
    <ComponiesCxt.Provider
      value={{
        params,
        companiesData,
        handleChangeParams,
        companiesLookupsData,
        handleRefreshCompaniesData,
        handleChangeCompaniesParams
      }}
    >
      {children}
    </ComponiesCxt.Provider>
  )
}

type ComponiesCxtType = {
  params: string
  handleChangeParams: (str: string) => void
  companiesLookupsData: CompaniesLookUpsType | undefined
  companiesData: TenantType[] | undefined
  handleRefreshCompaniesData: () => void
  handleChangeCompaniesParams: (str: string) => void
}
