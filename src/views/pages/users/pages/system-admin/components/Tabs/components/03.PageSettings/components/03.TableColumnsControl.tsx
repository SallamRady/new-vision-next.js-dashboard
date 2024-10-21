'use client'

// import packages
import { useMemo, useState } from 'react'

import { Checkbox, Switch, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import GenericDataTable from '@/components/tables/GenericDataTable'
import type { UserAdminPageTableColumnsControlType } from '@/types/users/users-system-admin-types'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UserAdminPageTableColumnsControlType>()

const mockData: UserAdminPageTableColumnsControlType[] = [
  { id: 1, title: 'id', visible: true },
  { id: 2, title: 'الأسم', visible: false },
  { id: 3, title: 'نوع المستخدم', visible: false },
  { id: 4, title: 'البريد الالكتروني', visible: false },
  { id: 5, title: 'رقم الجوال', visible: false },
  { id: 6, title: 'الفرع', visible: false },
  { id: 7, title: 'الشركة', visible: false },
  { id: 8, title: 'حالة المستخدم', visible: false },
  { id: 9, title: 'الاعدادات', visible: false }
]

export default function TableColumnsControl() {
  // ** declare and define component state and variables
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<UserAdminPageTableColumnsControlType, any>[]>(
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
        header: 'أسم العمود',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.title}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <Switch defaultChecked={row.original.visible} color='success' />
          </>
        )
      }
    ],
    []
  )

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <>
      <Typography variant='subtitle1' fontSize={18} fontWeight={700}>
        أعمدة الجدول
      </Typography>
      <GenericDataTable
        data={mockData}
        columns={columns}
        addDialogContent={<></>}
        globalFilterPlaceholder='بحث...'
        setOpenAddDialog={setOpenAddDialog}
        openAddDialog={openAddDialog}
      />
    </>
  )
}
