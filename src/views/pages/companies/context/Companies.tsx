'use client'

import type { Dispatch, SetStateAction } from 'react'
import { createContext, useState } from 'react'

import { useQuery, type UseQueryResult } from '@tanstack/react-query'

import { Backdrop, CircularProgress } from '@mui/material'

import type { ChildrenType } from '@/@core/types'
import { getCompaniesTable } from '@/utils/api/companies/list-companies'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'

export const CompaniesContext = createContext<CompaniesContext>({} as any)

export const CompaniesContextProvider = ({ children }: ChildrenType) => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState<string | number>(10)

  const query = useQuery({
    queryKey: ['companies table', page, search, limit],
    async queryFn() {
      const headers = await getClientAuthHeaders()

      const res = await getCompaniesTable(headers, { page, name: search, limit })

      return res
    }
  })

  return (
    <CompaniesContext.Provider
      value={{
        page,
        setPage,
        query,
        search,
        setSearch(search) {
          setSearch(search)
          setPage(1)
        },
        limit,
        setLimit(limit) {
          setLimit(limit)
          setPage(1)
        }
      }}
    >
      <Backdrop open={query.isLoading}>
        <CircularProgress />
      </Backdrop>
      {children}
    </CompaniesContext.Provider>
  )
}

type CompaniesContext = {
  query: UseQueryResult<Awaited<ReturnType<typeof getCompaniesTable>>, Error>
  page: number
  setPage: Dispatch<SetStateAction<number>>
  search: string
  setSearch: (search: string) => void
  limit: number | string
  setLimit: (limit: number | string) => void
}
