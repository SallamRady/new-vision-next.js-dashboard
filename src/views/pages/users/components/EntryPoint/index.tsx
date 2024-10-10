import { Stack } from '@mui/material'
import UsersTopCards from '../top-cards'
import UsersSearchFilters from '../SearchFilters'
import UsersDataTable from '../users-table/UsersTable'
import { UsersContextProvider } from '../../context'

export default function UsersPageEntryPoint() {
  return (
    <Stack spacing={2}>
      <UsersContextProvider>
        <UsersTopCards />
        <UsersSearchFilters />
        <UsersDataTable />
      </UsersContextProvider>
    </Stack>
  )
}
