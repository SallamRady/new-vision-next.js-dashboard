'use client'
// import packages
import { Checkbox, IconButton, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import { LoginIDType } from '@/types/system-admin/login-ids'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<LoginIDType>()

const mockData: LoginIDType[] = [
  { id: 1, name: 'البريد الألكتروني', usersNumber: 127, isActive: true, isDefault: true },
  { id: 2, name: 'رقم الهوية', usersNumber: 50, isActive: false, isDefault: false },
  { id: 3, name: 'رقم الجوال', usersNumber: 85, isActive: false, isDefault: false },
  { id: 4, name: 'أسم المستخدم', usersNumber: 0, isActive: false, isDefault: false }
]

export default function SystemAdminLoginIDsTab() {
  // ** declare and define component state and variables
  const [data, setData] = useState<LoginIDType[]>(mockData)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<LoginIDType, any>[]>(
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
        header: 'أسم المعرف',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('usersNumber', {
        header: 'عدد المستخدمين',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.usersNumber}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('isActive', {
        header: 'حالة المعرف',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.isActive ? 'مفعل' : 'غير مفعل'}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('isDefault', {
        header: 'المعرف الافتراضي للنظام؟',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.isDefault ? (
              <i className='ri-check-line text-success'></i>
            ) : (
              <i className='ri-close-large-line text-error'></i>
            )}
          </Typography>
        ),
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <IconButton color='default'>
              <i className='ri-more-2-line' />
            </IconButton>
          </>
        )
      }
    ],
    []
  )

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <Stack spacing={4}>
      <Typography variant='h6' fontSize={21} fontWeight={700} mt={4}>
        معرفات عملية الدخول (Login)
      </Typography>
      <GenericDataTable
        data={mockData}
        columns={columns}
        exportButtonLabel='تصدير'
        globalFilterPlaceholder='بحث...'
        onExport={() => console.log('Export users clicked')}
      />
    </Stack>
  )
}

type PropsType = {}
