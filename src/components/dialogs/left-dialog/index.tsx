'use client'
import React from 'react'
import { Dialog, Slide, DialogContent, DialogTitle, Button } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import './index.scss'

// Slide transition from the left
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction='right' ref={ref} {...props} />
})

export default function LeftSlideInDialog(props: LeftSlideInDialogProps) {
  // ** declare and define component state and variables
  const { open, setOpen, title, dialogContent } = props
  // ** declare and define component helper methods
  const handleClose = () => {
    setOpen(false)
  }
  // ** return component ui
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      PaperProps={{
        className: 'fixed top-0 left-0 w-64 h-screen m-0 overflow-hidden'
      }}
      aria-labelledby='slide-dialog-title'
    >
      <DialogTitle id='slide-dialog-title'>{title}</DialogTitle>
      <DialogContent className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100'>
        {dialogContent}
      </DialogContent>
    </Dialog>
  )
}

type LeftSlideInDialogProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  dialogContent: React.ReactNode
}
