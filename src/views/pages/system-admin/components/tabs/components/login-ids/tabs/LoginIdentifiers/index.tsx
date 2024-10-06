'use client'

// import packages
import { Checkbox, Chip, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useEffect, useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import { LoginIDType } from '@/types/system-admin/login-ids'
import Loader from '@/components/Loader'
import ActionMenuButton from './components/ActionMenuBtn'
import useLoginIdentifiers from '@/hooks/useLoginIdentifiers'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<LoginIDType>()

// Function to fetch login identifiers from the new API route
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SystemAdminLoginIdentifiersTab() {
  // ** declare and define component state and variables
  // Fetch data using SWR
  const { data, error, isLoading } = useLoginIdentifiers()
  const [tableData, setTableData] = useState<LoginIDType[]>([])

  // ** handle side effects
  useEffect(() => {
    if (data != undefined) {
      setTableData(data)
    }
  }, [data])

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
      columnHelper.accessor('number_users', {
        header: 'عدد المستخدمين',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.number_users}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('companies', {
        header: 'الشركات المستخدمة',
        cell: ({ row }) => (
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2} flexWrap={'wrap'}>
            {row.original.companies?.map(company => (
              <Chip key={`${company.id}}`} label={company.name} color='default' variant='tonal' />
            ))}
            {row.original.companies.length == 0 && <>لا يوجد</>}
          </Stack>
        ),
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('status', {
        header: 'الحالة',
        cell: ({ row }) => (
          <Chip
            label={row.original.status ? 'مفعل' : 'غير مفعل'}
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
  if (isLoading) return <Loader />
  if (error) return <Typography>Error loading data: {error.message}</Typography>
  return (
    <Stack spacing={4} mt={6}>
      <GenericDataTable
        data={tableData || []}
        columns={columns}
        exportButtonLabel='تصدير'
        globalFilterPlaceholder='بحث...'
        onExport={() => console.log('Export users clicked')}
        hideTableHeader={false}
        disableSearch={true}
      />
    </Stack>
  )
}

type PropsType = {}
