'use client'
// import packages
import { Card, CardContent } from '@mui/material'

// Style Imports
import RenderTable from '@/components/tables/render-table'
import { useHooks } from './useHooks'
import { SetCompanyButton } from './components/SetCompanyDialog'

export default function CompaniesDataTable() {
  const { table } = useHooks()
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
      </Card>
    </>
  )
}
