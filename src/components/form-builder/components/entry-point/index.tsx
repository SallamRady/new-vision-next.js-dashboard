import { FormEvent, FormEventHandler, useContext } from 'react'
import { Button, Grid, SxProps, Theme } from '@mui/material'
import GenericTextField from '../../controllers/text-field'
import GenericSelectField from '../../controllers/select-field'
import { GeneratedFormFieldType } from '@/types/input-controls-types'
import { FormBuilderCxt } from '../../context'

export default function FormBuilderEntryPoint(props: PropsType) {
  // ** declare and define component state and variables
  const { title, fields, customSxStyle } = props.data
  const { formBody } = useContext(FormBuilderCxt)
  // ** declare and define component helper methods
  const ShowSuitableField = (field: GeneratedFormFieldType) => {
    console.log('field.fieldTypefield.fieldType', field.fieldType)
    switch (field.fieldType) {
      case 'text':
        return <GenericTextField field={field} />
      case 'select':
        return <GenericSelectField field={field} />
      default:
        return <>Form Field type dont handled</>
    }
  }
  const handleOnSubmit = () => {
    console.log('AAAAAAAAAsd ', formBody)
  }

  // ** component ui
  return (
    <Grid
      container
      component={'form'}
      onSubmit={e => {
        e.preventDefault()
        handleOnSubmit()
      }}
      sx={customSxStyle}
      gap={2}
    >
      {/* form title */}
      {Boolean(title) && (
        <Grid item xs={12}>
          {title}
        </Grid>
      )}
      {/* form fields */}
      {fields?.map(field => (
        <Grid key={field.name} item xs={5}>
          {ShowSuitableField(field)}
        </Grid>
      ))}
      <Button type='submit'>Submit</Button>
    </Grid>
  )
}

type PropsType = {
  data: {
    title?: React.ReactNode
    fields: GeneratedFormFieldType[]
    customSxStyle?: SxProps<Theme> | undefined
    apiUrl: string
    // handleSumbit: (e: FormEvent<HTMLFormElement>) => void
  }
}
