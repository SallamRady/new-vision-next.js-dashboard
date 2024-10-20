export type TableSchemaRowValue = string | null | number | undefined

export type TableSchemaRow = Record<string, TableSchemaRowValue>

export type TableSchema = {
  id: number
  type: string
  schema: TableSchemaColumn[]
  created_at: any
  updated_at: string
}

export type TableSchemaColumn = {
  key: string
  fixed: number
  label: string
  selected: number
}
