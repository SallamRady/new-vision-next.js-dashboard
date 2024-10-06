import { z } from 'zod'

function validateText({ max, min, required }: ValidateTextOptions): ReturnType {
  let field: ReturnType = z.string()

  if (min) field = field.min(min)
  if (max) field = field.max(max)
  if (!required) field = field.optional()

  return field
}

type ReturnType = z.ZodOptional<z.ZodString> | z.ZodString

export type ValidateTextOptions = {
  min?: number
  max?: number
  required?: boolean
}

export default validateText
