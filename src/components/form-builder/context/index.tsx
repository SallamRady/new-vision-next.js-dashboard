'use client'

import type { ReactNode } from 'react'
import { createContext, useState } from 'react'

export const FormBuilderCxt = createContext<FormBuilderCxtType>({
  formBody: {},
  formLoading: false,
  handleChangeLoadingState: loading => {},
  handleChangeFieldValue: (fieldKey, value) => {}
})

export const FormBuilderCxtProvider = ({ children }: { children: ReactNode }) => {
  // ** declare and define component state and variables
  const [formLoading, setFormLoading] = useState(false)
  const [formBody, setFormBody] = useState<FormBodyType>({})

  // ** declare and define component helper methods
  /**
   * handle change form loading state
   * @param loading
   */
  function handleChangeLoadingState(loading: boolean) {
    setFormLoading(loading)
  }
  /**
   * handle store form body field
   * @param fieldKey
   * @param value
   */
  function handleChangeFieldValue(fieldKey: string, value: string) {
    setFormBody(body => ({ ...body, [fieldKey]: value }))
  }

  // ** return component ui
  return (
    <FormBuilderCxt.Provider value={{ formBody, formLoading, handleChangeLoadingState, handleChangeFieldValue }}>
      {children}
    </FormBuilderCxt.Provider>
  )
}

type FormBodyType = {
  [key: string]: string
}

export type FormBuilderCxtType = {
  formLoading: boolean
  formBody: FormBodyType
  handleChangeLoadingState(loading: boolean): void
  handleChangeFieldValue(fieldKey: string, value: string): void
}
