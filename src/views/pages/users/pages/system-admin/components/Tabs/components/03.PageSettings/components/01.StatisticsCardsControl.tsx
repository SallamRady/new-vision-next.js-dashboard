'use client'
// import packages
import { Checkbox, Switch, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import { UserAdminPageCardsControlType } from '@/types/users/users-system-admin-types'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UserAdminPageCardsControlType>()

const mockData: UserAdminPageCardsControlType[] = [
  { id: 1, title: 'كارت احصائيات : اجمالي عدد المستخدمين', visible: true },
  { id: 2, title: 'كارت احصائيات : المستخدمين المضافين اخر شهر', visible: false },
  { id: 3, title: 'كارت احصائيات : المستخدمين النشطيين', visible: false },
  { id: 4, title: 'كارت احصائيات : المستخدمين المعلقين', visible: false }
]

export default function StatisticsCardsControl() {
  // ** declare and define component state and variables
  const [data, setData] = useState<UserAdminPageCardsControlType[]>(mockData)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<UserAdminPageCardsControlType, any>[]>(
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
        header: 'أسم الكارت',
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
        Statistics Cards
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

type PropsType = {}
