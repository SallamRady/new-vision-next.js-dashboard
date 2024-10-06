'use client'

// React Imports
import { SetStateAction } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import { DialogContent } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'

const ScreenCenterDialog = (props: PropsType) => {
  // States
  const { open, setOpen, title, dialogContent } = props

  const handleDialogClose = () => setOpen(false)

  return (
    <Dialog onClose={handleDialogClose} aria-labelledby='screen-center-dialog' open={open}>
      <DialogTitle id='screen-center-dialog-title'>{title}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
    </Dialog>
  )
}

type PropsType = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  title: React.ReactNode
  dialogContent: React.ReactNode
}

export default ScreenCenterDialog
