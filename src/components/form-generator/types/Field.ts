import type { FieldValues, UseFormReturn } from 'react-hook-form'

export interface FieldOptions {
  name: string
  label: string
  type: FieldTypes
}

type FieldTypes = 'text' | 'file' | 'checkbox' | 'select'

export interface FieldDefaultProps<T extends FieldValues = FieldValues> {
  form: UseFormReturn<T, any, undefined>
  name: string
}

export interface FieldType<
  type extends FieldTypes,
  props extends Record<string, any>,
  validate extends Record<string, any>
> extends FieldOptions {
  type: type
  props: props
  validate: validate
}
