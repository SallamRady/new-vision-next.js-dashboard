'use client'

// import packages
import { useMemo, useState } from 'react'

import { Checkbox, IconButton, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import GenericDataTable from '@/components/tables/GenericDataTable'
import type { UserStatusType } from '@/types/users/users-system-admin-types'
import AddUserStatus from './AddUserStatus'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UserStatusType>()

const mockData: UserStatusType[] = [
  { id: 1, title: 'نشط' },
  { id: 1, title: 'غير نشط' }
]

export default function UserStatusTab() {
  // ** declare and define component state and variables
  // const [data, setData] = useState<UserStatusType[]>(mockData)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<UserStatusType, any>[]>(
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
      columnHelper.accessor('title', {
        header: 'حالة المستخدم',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.title}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: () => (
          <>
            <IconButton color='default'>
              <i className='ri-delete-bin-6-line' />
            </IconButton>
            <IconButton color='default'>
              <i className='ri-eye-line' />
            </IconButton>
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
    <GenericDataTable
      data={mockData}
      columns={columns}
      addButtonLabel='أضافة حالة جديدة'
      addDialogContent={<AddUserStatus />}
      exportButtonLabel='تصدير'
      globalFilterPlaceholder='بحث...'
      onExport={() => console.log('Export users clicked')}
      setOpenAddDialog={setOpenAddDialog}
      openAddDialog={openAddDialog}
    />
  )
}
