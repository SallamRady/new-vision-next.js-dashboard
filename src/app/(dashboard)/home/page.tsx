'use client'
import GenericFormBuilder from '@/components/form-builder'
import { GeneratedFormFieldType } from '@/types/input-controls-types'
import { Stack, Typography } from '@mui/material'

export default function Page() {
  const fields: GeneratedFormFieldType[] = [
    {
      name: 'field-1',
      label: 'full name 1',
      fieldType: 'text',
      required: true,
      handleChange: e => {
        console.log(e.target.value)
      }
    },
    {
      name: 'field-2',
      label: 'select 1',
      fieldType: 'select',
      options: [
        { label: 'option 1', value: '1' },
        { label: 'option 2', value: '2' }
      ],
      required: true,
      handleChange: e => {
        console.log(e.target.value)
      }
    },
    {
      name: 'field-3',
      label: 'full name 3',
      fieldType: 'text',
      required: true,
      handleChange: e => {
        console.log(e.target.value)
      }
    }
  ]
  return (
    <>
      <h1>Home page!</h1>
      <GenericFormBuilder
        title={
          <Stack alignItems={'center'} justifyContent={'center'}>
            <Typography textAlign={'center'} variant='body1' fontSize={22} fontWeight={700}>
              Generated Form
            </Typography>
          </Stack>
        }
        fields={fields}
        apiUrl='/'
      />
    </>
  )
}
