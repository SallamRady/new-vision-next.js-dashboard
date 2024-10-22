import React, { Suspense } from 'react'

import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'
import classNames from 'classnames'

import { LinearProgress } from '@mui/material'

import tableStyles from '@core/styles/table.module.css'
import { fuzzyFilter } from '@/utils/table/fuzzyFilter'

// declare props type
type Props<T> = {
  columns: ColumnDef<T, any>[]
  data?: T[]
}

export default function RenderTable<T>({ columns, data }: Props<T>) {
  const table = useReactTable<T>({
    columns,
    data: data || [],
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    globalFilterFn: fuzzyFilter
  })

  return (
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
  )
}
