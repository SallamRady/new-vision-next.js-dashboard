import { z } from 'zod'

export const numberStringSchema = z.string().refine(
  value => {
    return !isNaN(Number(value)) && Boolean(value)
  },
  {
    message: 'Invalid number string'
  }
)
