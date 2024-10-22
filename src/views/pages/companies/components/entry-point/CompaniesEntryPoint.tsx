'use client'

import { Stack } from '@mui/material'

import CompaniesTopCards from '../top-cards'
import CompaniesDataTable from '../companies-table'

export default function CompaniesEntryPoint() {
  console.log('CompaniesEntryPoint rendered 111')

  return (
    <Stack spacing={6}>
      <CompaniesTopCards />
      <CompaniesDataTable />
    </Stack>
  )
}
