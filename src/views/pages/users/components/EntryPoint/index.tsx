import { Stack } from '@mui/material'
import UsersTopCards from '../top-cards'
import FloatingTypography from '@/components/typography/floating'
import UsersSearchFilters from '../SearchFilters'
import UsersDataTable from '../users-table/UsersTable'

export default function UsersPageEntryPoint() {
  return (
    <Stack spacing={2}>
      <UsersTopCards />
      <UsersSearchFilters />
      <UsersDataTable />
    </Stack>
  )
}
