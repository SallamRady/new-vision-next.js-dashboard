import { Stack } from '@mui/material'

import TabsOfMainystemAdmin from '../tabs'

export default function SystemAdminEntryPoint() {
  return (
    <Stack spacing={4}>
      {/* TOP Cards */}
      {/* <SystemAdminTopCards /> */}
      {/* Main Tabs */}
      <TabsOfMainystemAdmin />
    </Stack>
  )
}
