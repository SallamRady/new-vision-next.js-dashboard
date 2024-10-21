'use client'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'

import type { SelectFieldOptionType } from '@/types/input-controls-types'

export default function SelectControlField(props: SelectControlFieldProps) {
  // ** declare and define helper variables
  const {
    label,
    options,
    addNoneOption,
    defaultValue = '',
    isfullWidth = true,
    handleSelectFieldChange,
    validationFun,
    isRequired = false,
    errorMsg = 'invalid choice',
    disabled = false
  } = props

  const error = false

  // ** return component UI
  return (
    <FormControl fullWidth={isfullWidth} sx={{ width: !isfullWidth ? '120px' : undefined }} required={isRequired}>
      <InputLabel id='demo-basic-select-outlined-label' size='small'>
        {label}
      </InputLabel>
      <Select
        label={label}
        defaultValue={defaultValue}
        size='small'
        onChange={e => {
          if (handleSelectFieldChange) handleSelectFieldChange(e.target.value)
          if (validationFun) validationFun(e.target.value)
        }}
        disabled={disabled}
        error={error}
      >
        {addNoneOption === true && (
          <MenuItem value={'none'}>
            <em>None</em>
          </MenuItem>
        )}
        {options?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText>{errorMsg}</FormHelperText>}
    </FormControl>
  )
}

type SelectControlFieldProps = {
  label: string
  options: SelectFieldOptionType[]
  handleSelectFieldChange?: (newValue: string) => void
  validationFun?: (str: string) => boolean

  //optional
  addNoneOption?: boolean
  defaultValue?: string
  isfullWidth?: boolean
  isRequired?: boolean
  errorMsg?: string
  disabled?: boolean
}
