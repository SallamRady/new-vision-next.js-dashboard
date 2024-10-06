import { GenerateSelectFieldProps } from '../fields/select'
import type { GenerateTextFieldProps } from '../fields/text'
import type { ValidateTextOptions } from '../validate/text'
import type { FieldOptions, FieldType } from './Field'

type CreateRenderFieldProps<T> = T

/*
  * Add All fields you want to include using the FieldType geniric type
    !constrains: Field name must be unique
*/
export type RenderFieldOptions =
  | FieldType<'text', GenerateTextFieldProps, ValidateTextOptions>
  | FieldType<'select', GenerateSelectFieldProps, {}>
