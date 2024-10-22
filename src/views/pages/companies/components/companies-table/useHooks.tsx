'use client'

// import packages
import { useContext, useMemo } from 'react'

import { Avatar, Box, Button, Checkbox, Chip, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { Menu } from '@szhsin/react-menu'

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
          header: label,
          cell: ({ row }) => rows[row.index]?.[key]
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
        cell: ({ row }) => (
          <div className='flex gap-2'>
            <Avatar src={row.original.media?.[0]?.original_url}>{row.original.name?.slice(0, 2)}</Avatar>
            <div>
              <Typography align='left'>{row.original.name}</Typography>
              <Typography align='left' variant='subtitle2'>
                @{row.original.tenancy_db_name}
              </Typography>
            </div>
          </div>
        ),

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
          let children = <></>

          if (row.original.status == -1) children = <Chip label='استكمال بيانات' color='warning' variant='tonal' />
          else children = <Chip label='Unkowen' color='error' variant='tonal' />

          return (
            <Box sx={{ borderRight: '2px solid transparent', borderRightColor: 'text.primary', pr: 1, width: 1 }}>
              {children}
            </Box>
          )
        },
        enableHiding: true // Allow hiding this column
      }),
      ...additionalCols,
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <Menu
              menuButton={
                <Button variant='contained' endIcon={<i className='ri-arrow-down-s-fill' />}>
                  اجراء
                </Button>
              }
              transition
            >
              <UpdateCompanyButton company={row.original as any} />
            </Menu>
          </>
        )
      }
    ]
  }, [!data?.schema])

  console.log('hooks rerenders')

  return { columns, companiesContext: companiesContextV2 }
}
