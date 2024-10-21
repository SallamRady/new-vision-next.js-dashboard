'use client'

// import packages
import { useEffect, useMemo, useState } from 'react'

import { Button, Checkbox, Chip, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import GenericDataTable from '@/components/tables/GenericDataTable'
import type { LoginWayType } from '@/types/login-way'
import useLoginWays from '@/hooks/useLoginWays'
import ActionMenuButton from './components/ActionMenuButton'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<LoginWayType>()

export default function SystemAdminLoginsWaysTab() {
  // ** declare and define component state and variables
  // Fetch data using SWR
  const { data, error } = useLoginWays()
  const [tableData, setTableData] = useState<LoginWayType[]>([])
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // ** handle side effects
  useEffect(() => {
    if (data != undefined) {
      setTableData(data)
    }
  }, [data])

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<LoginWayType, any>[]>(
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
        header: 'أسم برنامج الدخول',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('number_users', {
        header: 'عدد المستخدمين',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.number_users ?? '0'}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('provider', {
        header: 'مزود الخدمة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.provider?.name ?? '_'}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('status', {
        header: 'الحالة',
        cell: ({ row }) => (
          <Chip
            label={row.original.status ? 'مفعل' : 'معطل'}
            color={row.original.status ? 'success' : 'error'}
            variant='tonal'
          />
        ),
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <>
            <ActionMenuButton id={row.original.id} status={row.original.status} setTableData={setTableData} />
          </>
        )
      }
    ],
    []
  )

  // ** declare and define component helper methods

  // ** return component ui
  // if (isLoading) return <Loader />
  if (error) return <Typography>Error loading data: {error.message}</Typography>

  return (
    <Stack spacing={4} mt={6}>
      <Stack alignItems={'end'} justifyContent={'center'} my={4}>
        <Button variant='contained' disabled>
          أضافة
        </Button>
      </Stack>
      <GenericDataTable
        data={tableData || []}
        columns={columns}
        globalFilterPlaceholder='بحث...'
        hideTableHeader={true}
        setOpenAddDialog={setOpenAddDialog}
        openAddDialog={openAddDialog}
      />
    </Stack>
  )
}
