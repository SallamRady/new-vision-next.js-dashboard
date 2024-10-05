'use client'
import { TextField } from '@mui/material'

export default function TextFieldControl(props: TextFieldControlProps) {
  const { label, isRequired = false, handleChange, size = 'small' } = props

  return (
    <TextField
      fullWidth
      required={isRequired}
      label={label}
      size={size}
      onChange={e => {
        if (handleChange) {
          handleChange(e.target.value)
        }
      }}
    />
  )
}

type TextFieldControlProps = {
  label: string
  isRequired?: boolean
  size?: 'small' | 'medium'
  handleChange?: (str: string) => void
}
