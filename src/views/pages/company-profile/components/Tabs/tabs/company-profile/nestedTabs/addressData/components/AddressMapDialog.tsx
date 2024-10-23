import type { SetStateAction } from 'react'

import { Typography } from '@mui/material'

import ScreenCenterDialog from '@/components/dialogs/screen-center-dialog'
import AddressDialogContent from './AddressDialogContent'

export default function AddressMapDialog(props: PropsType) {
  // declare and define component state and variables
  const { open, setOpen } = props

  return (
    <ScreenCenterDialog
      open={open}
      setOpen={setOpen}
      isFullWidth={true}
      dialogMaxWidth='md'
      title={
        <Typography variant='body1' fontWeight={600} fontSize={19} mt={6} mb={2} textAlign={'center'}>
          احداثيات موقع العنوان الوطني
        </Typography>
      }
      dialogContent={<AddressDialogContent setOpen={setOpen} />}
    />
  )
}

type PropsType = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
}
