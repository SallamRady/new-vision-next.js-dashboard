import { Stack } from '@mui/material'
import UsersTopCards from '../top-cards'
import FloatingTypography from '@/components/typography/floating'
import UsersSearchFilters from '../SearchFilters'

export default function UsersPageEntryPoint() {
  return (
    <Stack spacing={2}>
      <UsersTopCards />
      <UsersSearchFilters />
    </Stack>
  )
}
