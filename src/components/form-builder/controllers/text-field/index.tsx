'use client'
import { TextField } from '@mui/material'
import { GeneratedFormFieldType } from '@/types/input-controls-types'
import { useContext } from 'react'
import { FormBuilderCxt } from '../../context'

export default function GenericTextField(props: propsType) {
  const { field } = props
  const { handleChangeFieldValue } = useContext(FormBuilderCxt)

  return (
    <TextField
      fullWidth
      id={field.name}
      label={field.label}
      onChange={e => {
        handleChangeFieldValue(field.name, e.target.value)
      }}
      variant='outlined'
      size={field.fieldSize ?? 'small'}
    />
  )
}

type propsType = {
  field: GeneratedFormFieldType
}
