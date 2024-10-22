import { z } from 'zod'

export type TableSchemaRowValue = string | null | number | undefined

export type TableSchemaRow = Record<string, TableSchemaRowValue>

export type TableSchema = {
  id: number
  type: string
  schema: TableSchemaColumn[]
  created_at: any
  updated_at: string
}

export const TableSchemaColumnSchema = z.object({
  key: z.string(),
  fixed: z.union([z.literal(0), z.literal(1)]).optional(), // 0 or 1 only
  label: z.string(),
  selected: z.union([z.literal(0), z.literal(1)]) // 0 or 1 only
})

export type TableSchemaColumnType = z.infer<typeof TableSchemaColumnSchema>

export type TableSchemaColumn = {
  key: string
  fixed: number
  label: string
  selected: number
}
