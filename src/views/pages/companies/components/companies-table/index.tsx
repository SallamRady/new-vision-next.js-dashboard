'use client'

import { Card, CardContent, Pagination } from '@mui/material'

// Style Imports
import RenderTable from '@/components/tables/render-table'
import { useHooks } from './useHooks'
import { SetCompanyButton } from './components/SetCompanyDialog'

export default function CompaniesDataTable() {
  const { columns, companiesContext } = useHooks()
  const { page, setPage, query } = companiesContext

  // ** return component ui
  return (
    <>
      <Card>
        <CardContent>
          <SetCompanyButton />
        </CardContent>
        <CardContent>
          <RenderTable key={page} columns={columns} data={query.data?.tenants.data} />
        </CardContent>
        <CardContent>
          <Pagination page={page} onChange={(e, page) => setPage(page)} count={query.data?.tenants.last_page || 1} />
        </CardContent>
      </Card>
    </>
  )
}
