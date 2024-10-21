'use client'
import { Stack } from '@mui/material'

import UsersSystemAdminTopCards from './components/top-cards'
import TabsOfUserSystemAdmin from './components/Tabs'

export default function UsersSystemAdminIndex() {
  return (
    <Stack spacing={3}>
      <UsersSystemAdminTopCards />
      <TabsOfUserSystemAdmin />
    </Stack>
  )
}
