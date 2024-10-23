'use client'

// React Imports
import type { SetStateAction } from 'react'

// MUI Imports
import Dialog from '@mui/material/Dialog'
import { DialogContent, IconButton } from '@mui/material'
import DialogTitle from '@mui/material/DialogTitle'

const ScreenCenterDialog = (props: PropsType) => {
  // States
  const { open, setOpen, title, dialogContent, dialogMaxWidth = 'sm', isFullWidth = false } = props

  const handleDialogClose = () => setOpen(false)

  return (
    <Dialog
      maxWidth={dialogMaxWidth}
      fullWidth={isFullWidth}
      onClose={handleDialogClose}
      aria-labelledby='screen-center-dialog'
      open={open}
    >
      <DialogTitle id='screen-center-dialog-title'>{title}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
      <IconButton
        onClick={handleDialogClose}
        sx={{
          position: 'absolute',
          left: '3%',
          top: '5%'
        }}
      >
        <i className='ri-close-large-line'></i>
      </IconButton>
    </Dialog>
  )
}

type PropsType = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  title: React.ReactNode
  dialogContent: React.ReactNode
  isFullWidth?: boolean
  dialogMaxWidth?: 'xs' | 'xl' | 'sm' | 'md' | 'lg'
}

export default ScreenCenterDialog
