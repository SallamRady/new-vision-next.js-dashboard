import { Stack } from '@mui/material'
import CompaniesTopCards from './components/top-cards'
import CompaniesDataTable from './components/companies-table'

export default function CompaniesPageContent() {
  return (
    <Stack spacing={6}>
      <CompaniesTopCards />
      <CompaniesDataTable />
    </Stack>
  )
}
