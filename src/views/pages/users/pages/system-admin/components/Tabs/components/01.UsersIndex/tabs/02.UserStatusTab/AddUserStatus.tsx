import { Button, Stack, TextField } from '@mui/material'

//AddUserRole
export default function AddUserStatus() {
  return (
    <Stack spacing={3}>
      <TextField variant='outlined' label='حالة المستخدم' size='small' />
      <Button size='small' variant='contained'>
        حفظ
      </Button>
    </Stack>
  )
}
