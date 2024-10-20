'use client'
// import packages
import { Card, CardContent, Grid, TextField } from '@mui/material'

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
          <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
              <TextField fullWidth size='small' placeholder='البحث' />
            </Grid>
            <Grid item xs={6} md={4}>
              <SetCompanyButton />
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <RenderTable table={table} />
        </CardContent>
      </Card>
    </>
  )
}
