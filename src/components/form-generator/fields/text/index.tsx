import type { HTMLInputTypeAttribute } from 'react'

import { TextField } from '@mui/material'

import type { FieldDefaultProps } from '../../types/Field'

function GenerateTextField({ name, form, type, label }: GenerateTextFieldProps) {
  return <TextField fullWidth type={type} label={label} placeholder={label} {...form.register(name)} />
}

export interface GenerateTextFieldProps extends FieldDefaultProps {
  type?: HTMLInputTypeAttribute
  label: string
}

export default GenerateTextField
