'use client'
import { Control, Controller, useFieldArray, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { CompanyFormType } from './SetCompanyDialog'
import { Box, InputLabel, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import CustomFilePond from '@/components/CustomFilePond'
import { useState } from 'react'
import { FileBondState } from '@/types/filepond'

export default function DynamicFormFields({ control, formIndex, register, setValue }: FieldsArrayProps) {
  // ** declare and define component state and varables
  const { fields } = useFieldArray({
    control,
    name: `forms.${formIndex}.fields` as const
  })
  const [uploadedFiles, setUploadedFiles] = useState<FileBondState>([])
  console.log('uploadedFilesuploadedFiles', uploadedFiles)

  // ** return component ui
  return (
    <>
      {/* Dynamically render fields */}
      {fields.map((dField, fieldIndex) => {
        return (
          <Box key={dField.id} my={2}>
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
                  <>
                    {/* Add the InputLabel */}
                    <InputLabel sx={{ fontSize: '18px' }} shrink htmlFor={`date-picker-${formIndex}-${fieldIndex}`}>
                      {dField.label}
                    </InputLabel>
                    <DatePicker
                      slotProps={{ textField: { size: 'small', id: `date-picker-${formIndex}-${fieldIndex}` } }}
                      value={field.value ? dayjs(field.value as string) : null}
                      onChange={newValue => {
                        field.onChange(newValue ? newValue.format('YYYY-MM-DD') : '')
                      }}
                    />
                  </>
                )}
              />
            )}
            {/* File */}
            {dField.type == 'file' && (
              <>
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
                        console.log('filesfiles', files)
                        // setValue(
                        //   `forms.${formIndex}.fields.${fieldIndex}.uploadedFiles`,
                        //   files.map(fileItem => fileItem.file)
                        // )
                        // setUploadedFiles(files.map(fileItem => fileItem.file))
                        field.onChange(files.map(file => file.file)?.[0])
                      }}
                      allowMultiple={false}
                      maxFiles={1}
                    />
                  )}
                />
              </>
            )}
          </Box>
        )
      })}
    </>
  )
}

interface FieldsArrayProps {
  control: Control<CompanyFormType>
  formIndex: number
  register: UseFormRegister<CompanyFormType>
  setValue: UseFormSetValue<CompanyFormType>
}
