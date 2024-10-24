'use client'

import { createContext, type ReactNode } from 'react'

import { useParams } from 'next/navigation'

import useCompanyDetails from '@/hooks/useCompanyDetails'
import CompanyDetailsLoadingPage from '../components/LoadingPage'
import type { TenantType } from '@/types/companies/CompanyTableRowType'

// types

export const CompanyDetailsCxt = createContext<CompanyDetailsCxtType>({
  companyData: undefined
})

export const CompanyDetailsCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const { id } = useParams()
  const { data: companyData, isLoading: loadingCompanyData } = useCompanyDetails(+(id as string))

  // ** handle side effects

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <CompanyDetailsCxt.Provider value={{ companyData }}>
      {!loadingCompanyData ? children : <CompanyDetailsLoadingPage />}
    </CompanyDetailsCxt.Provider>
  )
}

type CompanyDetailsCxtType = {
  companyData: TenantType | undefined
}
