import type { HTMLInputTypeAttribute } from 'react'

import { MenuItem, TextField } from '@mui/material'

import type { FieldDefaultProps } from '../../types/Field'
import { Controller } from 'react-hook-form'

function GenerateSelectField({ name, form, type, label, options }: GenerateSelectFieldProps) {
  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <TextField select fullWidth type={type} label={label} placeholder={label} {...field}>
          {options.map(({ title, value }) => (
            <MenuItem key={`${title} ${value}`} value={value}>
              {title}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

export interface GenerateSelectFieldProps extends FieldDefaultProps {
  type?: HTMLInputTypeAttribute
  label: string
  options: SelectOption[]
}

export type SelectOption = {
  title: string
  value: any
}

export default GenerateSelectField
