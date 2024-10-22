'use client'

import { Stack } from '@mui/material'

import CompaniesDataTable from '../companies-table'

export default function CompaniesEntryPoint() {
  console.log('CompaniesEntryPoint rendered 111')

  return (
    <Stack spacing={6}>
      <CompaniesDataTable />
    </Stack>
  )
}
