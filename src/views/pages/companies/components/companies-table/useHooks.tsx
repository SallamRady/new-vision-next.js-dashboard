'use client'

// import packages
import { useContext, useMemo } from 'react'

import { Button, Checkbox, Chip, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import type { TenantType } from '@/types/companies/CompanyTableRowType'
import { ComponiesCxt } from '../../context/ComponiesCxt'
import { fuzzyFilter } from '@/utils/table/fuzzyFilter'
import { getSortedRowModel } from '@/utils/table/getSortedRowModel'
import { UpdateCompanyButton } from './components/SetCompanyDialog'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<TenantType>()

export function useHooks() {
  const comapniesContext = useContext(ComponiesCxt)
  const { companiesData } = comapniesContext

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<TenantType, any>[]>(
    () => [
      {
        id: 'id',
        header: ({ table }) => (
          <Checkbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler()
            }}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            {...{
              checked: row.getIsSelected(),

              // disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler()
            }}
          />
        )
      },
      columnHelper.accessor('name', {
        header: 'الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('email', {
        header: 'البريد الالكتروني',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.email}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('type.name', {
        header: 'نوع الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.type?.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('registration_type', {
        header: 'نوع التسجيل',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.registration_type?.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('package', {
        header: 'الباقة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.package?.name ?? '_'}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('status', {
        header: 'الحالة',
        cell: ({ row }) => {
          if (row.original.status == -1) return <Chip label='استكمال بيانات' color='warning' variant='tonal' />

          return <Chip label='Unkowen' color='error' variant='tonal' />
        },
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <UpdateCompanyButton company={row.original as any} />
            <Tooltip
              arrow
              placement='left'
              title={
                <Paper>
                  <Button>Test</Button>
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
    ],
    []
  )

  const table = useReactTable<TenantType>({
    columns,
    data: companiesData || [],
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel,
    globalFilterFn: fuzzyFilter
  })

  return { table, comapniesContext }
}
