'use client'
// import packages
import { Button, Card, CardContent, Checkbox, Chip, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { CellContext, ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useContext, useMemo, useState } from 'react'
import { TenantType } from '@/types/companies/CompanyTableRowType'
import { ComponiesCxt } from '../../context/ComponiesCxt'
import { fuzzyFilter } from '@/utils/table/fuzzyFilter'
import RenderTable from '@/components/tables/render-table'
import { getSortedRowModel } from '@/utils/table/getSortedRowModel'
import { useQuery } from '@tanstack/react-query'
import { GetCompaniesTable } from '@/utils/api/companies/get-companies-table'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { ApiSchemaToTable } from '@/utils/table/api-schema-to-table'
import { TableSchemaRow } from '@/types/api/table-schema'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<TenantType>()

export default function CompaniesDataTable() {
  // ** declare and define component state and variables

  const { data } = useQuery({
    queryKey: ['companies table'],
    async queryFn() {
      const headers = await getClientAuthHeaders()
      return GetCompaniesTable(headers)
    }
  })

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<TableSchemaRow, any>[]>(() => {
    if (!data) return []
    const table = ApiSchemaToTable(data.schema, data.tenants)

    const cols: ColumnDef<TableSchemaRow, any>[] = [
      ...table.headers.map((header): ColumnDef<TableSchemaRow, any> => {
        return {
          id: header.key,
          header: header.label,
          cell: ({ row }: CellContext<TableSchemaRow, any>) => row.original[header.key]
        }
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <Tooltip
              arrow
              placement='left'
              title={
                <Paper>
                  <Button>Test - {row.original.id}</Button>
                </Paper>
              }
            >
              <IconButton color='default'>
                <i className='ri-more-2-line' />
              </IconButton>
            </Tooltip>
          </>
        )
      }
    ]
    return cols
  }, [!data])

  const table = useReactTable<TableSchemaRow>({
    columns,
    data: data?.tenants || [],
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel,
    globalFilterFn: fuzzyFilter
  })

  // ** return component ui
  return (
    <Card>
      <CardContent>
        <RenderTable table={table} />
      </CardContent>
    </Card>
  )
}
