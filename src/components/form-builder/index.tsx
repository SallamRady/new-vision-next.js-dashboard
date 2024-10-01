'use client'
import { FormEvent } from 'react'
import { SxProps, Theme } from '@mui/material'
import FormBuilderEntryPoint from './components/entry-point'
import { FormBuilderCxtProvider } from './context'
import { GeneratedFormFieldType } from '@/types/input-controls-types'

export default function GenericFormBuilder(props: PropsType) {
  // ** declare and define component state and variables

  // ** declare and define component helper methods

  // ** component ui
  return (
    <FormBuilderCxtProvider>
      <FormBuilderEntryPoint data={props} />
    </FormBuilderCxtProvider>
  )
}

type PropsType = {
  title?: React.ReactNode
  fields: GeneratedFormFieldType[]
  customSxStyle?: SxProps<Theme> | undefined
  apiUrl: string
  // handleSumbit: (e: FormEvent<HTMLFormElement>) => void
}
