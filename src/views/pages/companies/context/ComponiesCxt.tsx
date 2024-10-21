'use client'

import type { ReactNode } from 'react'

import { createContext, useState } from 'react'

import type { UseQueryResult } from '@tanstack/react-query'

import useCompaniesData from '@/hooks/useCompaniesData'
import useCompaniesLookups from '@/hooks/useCompaniesLookups'
import type { CompaniesLookUpsType, TenantType } from '@/types/companies/CompanyTableRowType'

// types

// import packages

export const ComponiesCxt = createContext<ComponiesCxtType>({} as ComponiesCxtType)

export const ComponiesCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [params, setParams] = useState('')
  const [companiesParams, setCompaniesParams] = useState('')
  const companiesQuery = useCompaniesData(companiesParams)
  const { data: companiesData, refetch: refreshCompaniesData } = companiesQuery
  const lookupsQuery = useCompaniesLookups(params)
  const { data: companiesLookupsData } = lookupsQuery

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
        handleChangeCompaniesParams,
        companiesQuery,
        lookupsQuery
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
  companiesQuery: UseQueryResult<TenantType[], Error>
  lookupsQuery: UseQueryResult<CompaniesLookUpsType, Error>
}
