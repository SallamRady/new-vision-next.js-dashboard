import { TableSchema, TableSchemaColumn, TableSchemaRow, TableSchemaRowValue } from '@/types/api/table-schema'

export type SchemaTable = {
  headers: TableSchemaColumn[]
  rows: TableSchemaRow[]
}

export function ApiSchemaToTable(schema: TableSchema, schemaRows: TableSchemaRow[]) {
  const headers = schema.schema.filter(({ selected }) => Boolean(selected))
  const rows: SchemaTable['rows'] = schemaRows
  return { headers, rows }
}
