'use client'

// import packages
import { useContext } from 'react'

import { Card, CardContent, Pagination } from '@mui/material'

// Style Imports
import RenderTable from '@/components/tables/render-table'
import { useHooks } from './useHooks'
import { SetCompanyButton } from './components/SetCompanyDialog'
import { CompaniesContext } from '../../context/Companies'

export default function CompaniesDataTable() {
  const { table } = useHooks()

  const { page, setPage, query } = useContext(CompaniesContext)

  // ** return component ui
  return (
    <>
      <Card>
        <CardContent>
          <SetCompanyButton />
        </CardContent>
        <CardContent>
          <RenderTable table={table} />
        </CardContent>
        <CardContent>
          <Pagination page={page} onChange={(e, page) => setPage(page)} count={query.data?.tenants.last_page || 1} />
        </CardContent>
      </Card>
    </>
  )
}
