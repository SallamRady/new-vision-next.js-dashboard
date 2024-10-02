'use client'

//import SWR
import useSWR from 'swr'

// import packages
import { Checkbox, Chip, IconButton, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import { LoginIDType } from '@/types/system-admin/login-ids'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<LoginIDType>()

// Function to fetch login identifiers from the new API route
const fetcher = (url: string) => fetch(url).then(res => res.json())

export default function SystemAdminLoginIdentifiersTab() {
  // ** declare and define component state and variables
  // Fetch data using SWR
  const { data, error, isLoading } = useSWR<LoginIDType[]>('/server/system-admin/login-ids', fetcher)
  console.log('SWR Response ::', data, error, isLoading)

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
      columnHelper.accessor('jointCompanies', {
        header: 'الشركات المستخدمة',
        cell: ({ row }) => (
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2} flexWrap={'wrap'}>
            {row.original.jointCompanies?.map(company => (
              <Chip
                key={`${company}-${row.original.jointCompanies.join(',')}`}
                label={company}
                color='default'
                variant='tonal'
              />
            ))}
            {row.original.jointCompanies.length == 0 && <>لا يوجد</>}
          </Stack>
        ),
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('serviceProviders', {
        header: 'مزودين الخدمة',
        cell: ({ row }) => (
          <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={2} flexWrap={'wrap'}>
            {row.original.serviceProviders?.map(provider => (
              <Chip
                key={`${provider}-${row.original.serviceProviders.join(',')}`}
                label={provider}
                color='default'
                variant='tonal'
              />
            ))}
            {row.original.serviceProviders.length == 0 && <>لا يوجد</>}
          </Stack>
        ),
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('isActive', {
        header: 'الحالة',
        cell: ({ row }) => (
          <Chip
            label={row.original.isActive ? 'مفعل' : 'غير مفعل'}
            color={row.original.isActive ? 'success' : 'error'}
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
  if (isLoading) return <Typography>Loading...</Typography>
  if (error) return <Typography>Error loading data: {error.message}</Typography>
  return (
    <Stack spacing={4} mt={6}>
      <GenericDataTable
        data={data || []}
        columns={columns}
        exportButtonLabel='تصدير'
        globalFilterPlaceholder='بحث...'
        onExport={() => console.log('Export users clicked')}
        hideTableHeader={true}
      />
    </Stack>
  )
}

type PropsType = {}
