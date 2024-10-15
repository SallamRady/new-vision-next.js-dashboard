import { Control, Controller, useFieldArray, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { CompanyFormType } from './SetCompanyDialog'
import { Box, InputLabel, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'

export default function DynamicFormFields({ control, formIndex, register, setValue }: FieldsArrayProps) {
  // ** declare and define component state and varables
  const { fields } = useFieldArray({
    control,
    name: `forms.${formIndex}.fields` as const
  })

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
                <input
                  type='file'
                  {...register(`forms.${formIndex}.fields.${fieldIndex}.value` as const)}
                  onChange={e => {
                    console.log('Fileeeeeees', e.target.files)
                  }}
                  className='bg-inherit'
                  multiple
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
