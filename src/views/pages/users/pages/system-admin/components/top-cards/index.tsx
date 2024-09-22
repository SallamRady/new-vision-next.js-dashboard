import { Stack } from '@mui/material'
import UsersAdmanCardNUm1 from './components/card-1'
import UsersAdmanCardNUm2 from './components/card-2'
import UsersAdmanCardNUm3 from './components/card-3'

export default function UsersSystemAdminTopCards() {
  return (
    <Stack direction={'row'} spacing={3} flexWrap={'wrap'}>
      {/* Card number 1 */}
      <UsersAdmanCardNUm1 />
      {/* Card number 2 */}
      <UsersAdmanCardNUm2 />
      {/* card number 3 */}
      <UsersAdmanCardNUm3 />
    </Stack>
  )
}
