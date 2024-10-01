// React Imports
import { forwardRef } from 'react'
import type { ReactElement, Ref, SetStateAction } from 'react'

// MUI Imports
import Slide from '@mui/material/Slide'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import type { SlideProps } from '@mui/material/Slide'

const Transition = forwardRef(function Transition(
  props: SlideProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function ScreenCenterDialog(props: PropsType) {
  // ** declare and define component state and variables
  const { open, setOpen, title, dialogContent } = props
  // ** declare and define component helper methods
  const handleClose = () => setOpen(false)

  // ** return component ui
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-labelledby='alert-dialog-slide-title'
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle id='alert-dialog-slide-title'>{title}</DialogTitle>
      <DialogContent>{dialogContent}</DialogContent>
    </Dialog>
  )
}

type PropsType = {
  open: boolean
  setOpen: React.Dispatch<SetStateAction<boolean>>
  title?: string
  dialogContent: React.ReactNode
}
