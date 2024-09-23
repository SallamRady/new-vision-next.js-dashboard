import { Stack } from '@mui/material'
import UsersAdmanCardNUm1 from './components/card-1'
import UsersAdmanCardNUm2 from './components/card-2'
import UsersAdmanCardNUm3 from './components/card-3'
import UsersAdmanCardNUm4 from './components/card-4'

export default function UsersSystemAdminTopCards() {
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row'
      }}
      spacing={3}
      flexWrap={'wrap'}
      justifyContent={{
        sx: 'start',
        sm: 'space-between'
      }}
    >
      {/* Card number 1 */}
      <UsersAdmanCardNUm1 />
      {/* Card number 2 */}
      <UsersAdmanCardNUm2 />
      {/* card number 3 */}
      <UsersAdmanCardNUm3 />
      {/* card number 4 */}
      <UsersAdmanCardNUm4 />
    </Stack>
  )
}
