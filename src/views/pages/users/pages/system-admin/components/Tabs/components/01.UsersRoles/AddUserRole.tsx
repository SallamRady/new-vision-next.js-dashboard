import { Button, Stack, TextField } from '@mui/material'

//AddUserRole
export default function AddUserRole() {
  return (
    <Stack spacing={3}>
      <TextField variant='outlined' label='دور المستخدم' size='small' />
      <Button size='small' variant='contained'>
        حفظ
      </Button>
    </Stack>
  )
}
