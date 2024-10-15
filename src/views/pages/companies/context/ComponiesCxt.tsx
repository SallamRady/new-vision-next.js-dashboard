'use client'

import useCompaniesLookups from '@/hooks/useCompaniesLookups'
import { CompaniesLookUpsType } from '@/types/companies/CompanyTableRowType'
// types
import type { ReactNode } from 'react'

// import packages
import { createContext, useState } from 'react'

export const ComponiesCxt = createContext<ComponiesCxtType>({
  params: '',
  handleChangeParams: str => {},
  companiesLookupsData: undefined
})

export const ComponiesCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [params, setParams] = useState('')
  const { data: companiesLookupsData } = useCompaniesLookups(params)

  // ** handle side effects

  // ** declare and define component helper methods
  const handleChangeParams = (str: string) => {
    setParams(str)
  }

  // ** return component ui
  return (
    <ComponiesCxt.Provider
      value={{
        params,
        handleChangeParams,
        companiesLookupsData
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
}
