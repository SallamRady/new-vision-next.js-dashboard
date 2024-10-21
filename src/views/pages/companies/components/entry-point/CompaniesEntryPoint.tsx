'use client'

import { useContext } from 'react'

import { Stack } from '@mui/material'

import CompaniesTopCards from '../top-cards'
import CompaniesDataTable from '../companies-table'
import { CompaniesContext } from '../../context/Companies'

export default function CompaniesEntryPoint() {
  console.log('CompaniesEntryPoint rendered 111')

  const { page } = useContext(CompaniesContext)

  return (
    <Stack spacing={6}>
      <CompaniesTopCards />
      <CompaniesDataTable key={page} />
    </Stack>
  )
}
