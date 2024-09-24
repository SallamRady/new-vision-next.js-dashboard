import { Stack } from '@mui/material'
import SystemAdmanCardNUm1 from './components/card-1'
import SystemAdmanCardNUm2 from './components/card-2'
import SystemAdmanCardNUm3 from './components/card-3'
import SystemAdmanCardNUm4 from './components/card-4'

export default function SystemAdminTopCards() {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row'
      }}
      spacing={2}
      flexWrap={'wrap'}
      justifyContent={{
        sx: 'start',
        sm: 'space-between'
      }}
    >
      {/* card number 1 */}
      <SystemAdmanCardNUm1 />
      {/* card number 2 */}
      <SystemAdmanCardNUm2 />
      {/* card number 3 */}
      <SystemAdmanCardNUm3 />
      {/* card number 4 */}
      <SystemAdmanCardNUm4 />
    </Stack>
  )
}
