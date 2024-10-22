import type { ReactNode } from 'react'
import React, { Suspense, useContext } from 'react'

import Link from 'next/link'

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'

import { Button, CardContent, Grid, LinearProgress } from '@mui/material'

// Style Imports
import { Menu } from '@szhsin/react-menu'

import { useMutation } from '@tanstack/react-query'

import LoadingButton from '@mui/lab/LoadingButton'

import tableStyles from '@core/styles/table.module.css'
import { fuzzyFilter } from '@/utils/table/fuzzyFilter'
import { SetCompanyButton } from './SetCompanyDialog'
import { getClientAuthHeaders } from '@/libs/headers/clientHeaders'
import { getExportCompaniesUrl } from '@/utils/api/companies/export-rows'
import { SetSchemaButton } from './SetSchemaDialog'
import { CompaniesContext } from '../../../context/Companies'

// declare props type
type Props<T> = {
  columns: ColumnDef<T, any>[]
  data?: T[]
  searchElement?: ReactNode
}

export default function RenderCompainesTable<T>({ columns, data, searchElement }: Props<T>) {
  const table = useReactTable<T>({
    columns,
    data: data || [],
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter,
    getRowId: row => (row as any).id, // Ensure each row has a unique 'id' field
    enableRowSelection: true // Enables row selection
  })

  const {
    mutate,
    data: exportData,
    isPending,
    reset
  } = useMutation({
    async mutationFn() {
      const headers = await getClientAuthHeaders()

      // Get selected row IDs from the table instance
      const selectedRowIds = table.getSelectedRowModel().rows.map(row => (row.original as any).id)

      // Pass the selected row IDs to the export function
      const res = getExportCompaniesUrl(headers, { ids: selectedRowIds })

      return res
    }
  })

  const { query } = useContext(CompaniesContext)

  return (
    <>
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {searchElement}
          </Grid>
          <Grid item xs={12} md={4}>
            <div className='flex gap-2 items-center justify-between'>
              <>
                <Menu
                  menuButton={
                    <Button variant='contained' endIcon={<i className='ri-arrow-down-s-fill' />}>
                      انشاء شركة
                    </Button>
                  }
                  transition
                >
                  <SetCompanyButton />
                </Menu>
              </>

              {exportData ? (
                <Button
                  component={Link}
                  target='_blank'
                  href={exportData.url}
                  color='success'
                  variant='contained'
                  onClick={reset}
                >
                  تحميل الملف
                </Button>
              ) : (
                <LoadingButton
                  endIcon={<i className='ri-upload-2-line' />}
                  color='inherit'
                  onClick={() => mutate()}
                  variant='outlined'
                  loading={isPending}
                >
                  تصدير
                </LoadingButton>
              )}
              {query.data?.schema && (
                <SetSchemaButton
                  onSuccess={() => {
                    query.refetch()
                  }}
                  schema={query.data?.schema.schema}
                  schemaId={query.data?.schema.id}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent>
        <div className='overflow-x-auto'>
          <table className={tableStyles.table}>
            {/* set table headers */}
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className='text-center'>
                      {header.isPlaceholder ? null : (
                        <div
                          className={classNames({
                            'flex items-center justify-center': header.column.getIsSorted(),
                            'cursor-pointer select-none': header.column.getCanSort()
                          })}
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getIsSorted() && (
                            <>
                              {header.column.getIsSorted() === 'asc' ? (
                                <i className='ri-arrow-up-s-line text-xl' />
                              ) : (
                                <i className='ri-arrow-down-s-line text-xl' />
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            {/* set data body */}
            <tbody>
              <Suspense fallback={<LinearProgress />}>
                {table.getFilteredRowModel().rows.length === 0 ? (
                  <tr>
                    <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                      No data available
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={classNames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className='text-center'>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </Suspense>
            </tbody>
          </table>
        </div>
      </CardContent>
    </>
  )
}
