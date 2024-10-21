import { Button, Stack } from '@mui/material'

import ConfigsTable from './ConfigsTable'

function SettingsTab() {
  return (
    <Stack spacing={4}>
      <div className='flex flex-row-reverse'>
        <Button color='primary' variant='contained'>
          اضافة
        </Button>
      </div>
      <ConfigsTable />
    </Stack>
  )
}

export default SettingsTab
