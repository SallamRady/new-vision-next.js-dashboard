'use client'
import type { GeneratedFormFieldType } from '@/types/input-controls-types'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useContext } from 'react'
import { FormBuilderCxt } from '../../context'

export default function GenericSelectField(props: PropsType) {
  // ** declare and define helper variables
  const { field } = props
  const { handleChangeFieldValue } = useContext(FormBuilderCxt)
  // ** return component UI
  return (
    <FormControl fullWidth>
      <InputLabel id='demo-basic-select-outlined-label' size='small'>
        {field.label}
      </InputLabel>
      <Select
        label={field.label}
        defaultValue=''
        onChange={e => {
          handleChangeFieldValue(field.name, e.target.value)
        }}
        size={field.fieldSize ?? 'small'}
      >
        {field.options?.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

type PropsType = {
  field: GeneratedFormFieldType
}
