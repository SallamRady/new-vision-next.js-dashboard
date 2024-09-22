import { Stack } from '@mui/material'
import UsersAdmanCardNUm1 from './components/card-1'

export default function UsersSystemAdminTopCards() {
  return (
    <Stack direction={'row'} spacing={3} flexWrap={'wrap'}>
      {/* Card number 1 */}
      <UsersAdmanCardNUm1 />
    </Stack>
  )
}
