import { Button, Stack } from '@mui/material'

import TextFieldControl from '@/components/forms/text-field/TextFieldControl'

export default function GmailTab() {
  return (
    <Stack spacing={4} width={'100%'}>
      <TextFieldControl label='Mail Driver' />
      <TextFieldControl label='Mail Host' />
      <TextFieldControl label='Mail Port' />
      <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} spacing={6}>
        <Button variant='contained'>تحديث</Button>
        <Button variant='outlined'>اظهار اقتراحات</Button>
      </Stack>
    </Stack>
  )
}
