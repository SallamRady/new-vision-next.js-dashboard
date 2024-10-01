export type SelectFieldOptionType = { label: string; value: string }

export type FormFieldType = 'text' | 'email' | 'number' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file'

export type DateRangeType = { min?: Date; max?: Date }

export default FileFilterType = 'IMAGE' | 'JPEG' | 'PNG' | 'GIF' | 'PDF' | 'DOCX' | 'MP3' | 'MP4'

export default FieldSizeType = 'small' | 'medium'

export type GeneratedFormFieldType = {
  // unique field identifier
  name: string
  // main field options
  label: string
  fieldType: FormFieldType
  fieldSize?: FieldSizeType
  placeHolder?: String
  options?: SelectFieldOptionType[]
  // validation options
  required?: Boolean
  minLength?: number
  maxLength?: number
  isEmail?: Boolean
  rowsNumbers?: number
  colsNumbers?: number
  dateRange?: DateRangeType
  uploadedFileType?: FileFilterType
  // handle change method
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
