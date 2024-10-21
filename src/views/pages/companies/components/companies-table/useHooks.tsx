'use client'

// import packages
import { useContext, useMemo } from 'react'

import { Button, Checkbox, Chip, Typography } from '@mui/material'
import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { Menu, MenuItem } from '@szhsin/react-menu'

import { fuzzyFilter } from '@/utils/table/fuzzyFilter'
import { getSortedRowModel } from '@/utils/table/getSortedRowModel'
import { UpdateCompanyButton } from './components/SetCompanyDialog'
import { CompaniesContext } from '../../context/Companies'
import { ApiSchemaToTable } from '@/utils/table/api-schema-to-table'
import type { Tenant } from '@/types/api/common/Tenant'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<Tenant>()

export function useHooks() {
  const companiesContextV2 = useContext(CompaniesContext)

  const {
    query: { data }
  } = companiesContextV2

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<Tenant, any>[]>(() => {
    let additionalCols: ColumnDef<Tenant, any>[] = []

    if (data) {
      console.log(data)
      const { headers, rows } = ApiSchemaToTable(data.schema, data.tenants_preview.data)

      additionalCols = headers.map(({ key, label }) => {
        return {
          id: 'id',
          header: label,
          cell: ({ row }) => rows[row.index][key]
        }
      })
    }

    return [
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
      ...additionalCols,
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <Menu menuButton={<Button variant='contained'>اجراء</Button>} transition>
              <MenuItem>
                <UpdateCompanyButton company={row.original as any} />
              </MenuItem>
            </Menu>
          </>
        )
      }
    ]
  }, [!data?.schema])

  console.log('hooks rerenders')

  const table = useReactTable<Tenant>({
    columns,
    data: data?.tenants?.data || [],
    filterFns: { fuzzy: fuzzyFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel,
    globalFilterFn: fuzzyFilter
  })

  return { table, companiesContext: companiesContextV2 }
}
