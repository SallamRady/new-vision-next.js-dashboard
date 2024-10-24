'use client'

import dayjs from 'dayjs'
import { Controller, useFieldArray } from 'react-hook-form'

// MUI
import { Box, InputLabel, Stack, TextField } from '@mui/material'

import { DatePicker } from '@mui/x-date-pickers/DatePicker'

import type { Control, UseFormRegister, UseFormSetValue } from 'react-hook-form'

import CustomFilePond from '@/components/CustomFilePond'

import type { CompanyFormType } from '..'

export default function DynamicFormFields({ control, formIndex, register }: FieldsArrayProps) {
  // ** declare and define component state and varables
  const { fields } = useFieldArray({
    control,
    name: `forms.${formIndex}.fields` as const
  })

  // ** return component ui
  return (
    <Stack>
      {/* Dynamically render fields */}
      {fields.map((dField, fieldIndex) => {
        return (
          <Stack key={dField.id} my={2}>
            {/* Text */}
            {dField.type == 'text' && (
              <TextField
                fullWidth
                label={dField.label}
                size='small'
                {...register(`forms.${formIndex}.fields.${fieldIndex}.value` as const)}
              />
            )}
            {/* Date */}
            {dField.type == 'date' && (
              <Controller
                name={`forms.${formIndex}.fields.${fieldIndex}.value`}
                control={control}
                render={({ field }) => (
                  <Box>
                    {/* Add the InputLabel */}
                    <InputLabel sx={{ fontSize: '18px' }} shrink htmlFor={`date-picker-${formIndex}-${fieldIndex}`}>
                      {dField.label}
                    </InputLabel>
                    <DatePicker
                      slotProps={{
                        textField: { size: 'small', fullWidth: true, id: `date-picker-${formIndex}-${fieldIndex}` }
                      }}
                      value={field.value ? dayjs(field.value as string) : null}
                      onChange={newValue => {
                        field.onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
                      }}
                    />
                  </Box>
                )}
              />
            )}
            {/* File */}
            {dField.type == 'file' && (
              <Box>
                <InputLabel sx={{ fontSize: '18px' }} shrink htmlFor={`date-picker-${formIndex}-${fieldIndex}`}>
                  {dField.label}
                </InputLabel>
                <Controller
                  name={`forms.${formIndex}.fields.${fieldIndex}.uploadedFiles`}
                  control={control}
                  render={({ field }) => (
                    <CustomFilePond
                      {...field}
                      onupdatefiles={files => {
                        field.onChange(files.map(file => file.file)?.[0])
                      }}
                      allowMultiple={false}
                      maxFiles={1}
                    />
                  )}
                />
              </Box>
            )}
          </Stack>
        )
      })}
    </Stack>
  )
}

interface FieldsArrayProps {
  control: Control<CompanyFormType>
  formIndex: number
  register: UseFormRegister<CompanyFormType>
  setValue: UseFormSetValue<CompanyFormType>
}
