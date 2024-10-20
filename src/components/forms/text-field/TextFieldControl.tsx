'use client'
import { TextField } from '@mui/material'
import type { FilledInputProps, OutlinedInputProps } from '@mui/material'
import { HTMLInputTypeAttribute, useState } from 'react'
import type { InputProps } from 'react-otp-input'

export default function TextFieldControl(props: TextFieldControlProps) {
  const [error, setError] = useState(false)
  const {
    label,
    isRequired = false,
    handleChange,
    validationFun,
    size = 'small',
    type = 'text',
    errorMsg = 'invalid input',
    placeholder = '',
    value,
    disabled = false,
    inputProps = undefined
  } = props

  return (
    <TextField
      fullWidth
      required={isRequired}
      label={label}
      size={size}
      type={type}
      value={value}
      onChange={e => {
        if (handleChange) {
          handleChange(e.target.value)
        }
        if (validationFun) {
          let valid = validationFun(e.target.value)
          if (!valid) setError(true)
          else setError(false)
        }
      }}
      error={error}
      helperText={error ? errorMsg : ''}
      placeholder={placeholder}
      InputProps={inputProps}
      disabled={disabled}
    />
  )
}

type TextFieldControlProps = {
  label: string
  value?: string
  isRequired?: boolean
  size?: 'small' | 'medium'
  type?: HTMLInputTypeAttribute
  handleChange?: (str: string) => void
  validationFun?: (str: string) => boolean
  errorMsg?: string
  placeholder?: string
  disabled?: boolean
  inputProps?: Partial<InputProps> | Partial<FilledInputProps> | Partial<OutlinedInputProps> | undefined
}
