'use client'
// import packages
import { Checkbox, Chip, IconButton, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import { UsersRolesType } from '@/types/users/users-system-admin-types'
import AddUserRole from './AddUserRole'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UsersRolesType>()

const mockData: UsersRolesType[] = [
  { id: 1, title: 'مستخدم نظام', permissions: ['read', 'write'] },
  { id: 1, title: 'مستخدم شركة', permissions: ['read'] }
]

export default function UserRolesTab() {
  // ** declare and define component state and variables
  // const [data, setData] = useState<UsersRolesType[]>(mockData)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<UsersRolesType, any>[]>(
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
        header: 'الدور',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.title}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('permissions', {
        header: 'الصلاحيات',
        cell: ({ row }) => (
          <Stack direction={'row'} flexWrap={'wrap'} spacing={2}>
            {row.original.permissions?.map(permission => (
              <Chip key={permission} label={permission} color='default' variant='tonal' />
            ))}
          </Stack>
        ),
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
      addButtonLabel='أضافة دور جديد'
      addDialogContent={<AddUserRole />}
      exportButtonLabel='تصدير'
      globalFilterPlaceholder='بحث...'
      onExport={() => console.log('Export users clicked')}
      setOpenAddDialog={setOpenAddDialog}
      openAddDialog={openAddDialog}
    />
  )
}
