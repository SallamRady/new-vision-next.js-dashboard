'use client'

// import packages
import { useMemo, useState } from 'react'

import Image from 'next/image'

import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import GenericDataTable from '@/components/tables/GenericDataTable'
import type { CountryType } from '@/types/system-admin/countries'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<CountryType>()

const mockData: CountryType[] = [
  {
    id: 1,
    shortname: 'EG',
    name: 'Egypt',
    name_ar: 'مصر',
    phonecode: 20,
    status: true,
    flag_url: 'https://new.vision-dashbord.com/public/flags/flag-of-Egypt.jpg'
  },
  {
    id: 2,
    shortname: 'EG',
    name: 'Egypt',
    name_ar: 'مصر',
    phonecode: 20,
    status: true,
    flag_url: 'https://new.vision-dashbord.com/public/flags/flag-of-Egypt.jpg'
  },
  {
    id: 3,
    shortname: 'EG',
    name: 'Egypt',
    name_ar: 'مصر',
    phonecode: 20,
    status: true,
    flag_url: 'https://new.vision-dashbord.com/public/flags/flag-of-Egypt.jpg'
  },
  {
    id: 4,
    shortname: 'EG',
    name: 'Egypt',
    name_ar: 'مصر',
    phonecode: 20,
    status: true,
    flag_url: 'https://new.vision-dashbord.com/public/flags/flag-of-Egypt.jpg'
  },
  {
    id: 5,
    shortname: 'EG',
    name: 'Egypt',
    name_ar: 'مصر',
    phonecode: 20,
    status: true,
    flag_url: 'https://new.vision-dashbord.com/public/flags/flag-of-Egypt.jpg'
  }
]

export default function SystemAdminCountryTab() {
  // ** declare and define component state and variables
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<CountryType, any>[]>(
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
        header: 'أسم الدولة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('shortname', {
        header: 'الأسم المختصر',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.shortname}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('name_ar', {
        header: 'الأسم العربي',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name_ar}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('phonecode', {
        header: 'كود الجوال',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.phonecode}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('status', {
        header: 'الحالة',
        cell: ({ row }) => {
          if (row.original.status == true) return <Chip label='فعالة' color='success' variant='tonal' />

          return <Chip label='غير فعالة' color='warning' variant='tonal' />
        },
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('flag_url', {
        header: 'علم الدولة',
        cell: ({ row }) => (
          <Image src={row.original.flag_url} width={30} height={30} alt={`${row.original.name} flag`} />
        ),
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: () => (
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
    <GenericDataTable
      data={mockData}
      columns={columns}
      exportButtonLabel='تصدير'
      globalFilterPlaceholder='بحث...'
      onExport={() => console.log('Export users clicked')}
      setOpenAddDialog={setOpenAddDialog}
      openAddDialog={openAddDialog}
    />
  )
}
