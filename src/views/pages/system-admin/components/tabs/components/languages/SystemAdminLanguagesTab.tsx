'use client'
// import packages
import { Checkbox, IconButton, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import { LanguageType } from '@/types/system-admin/laguages'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<LanguageType>()

const mockData: LanguageType[] = [
  {
    id: 1,
    lang: 'Arabic',
    native: 'عربى',
    iso_code: 'ar',
    is_active: true,
    is_rtl: true,
    is_default: false,
    created_at: '2018-06-24T18:16:38.000000Z',
    updated_at: '2018-06-24T18:16:38.000000Z',
    lang_ar: 'عربى'
  },
  {
    id: 2,
    lang: 'Arabic',
    native: 'عربى',
    iso_code: 'ar',
    is_active: true,
    is_rtl: true,
    is_default: false,
    created_at: '2018-06-24T18:16:38.000000Z',
    updated_at: '2018-06-24T18:16:38.000000Z',
    lang_ar: 'عربى'
  },
  {
    id: 3,
    lang: 'Arabic',
    native: 'عربى',
    iso_code: 'ar',
    is_active: true,
    is_rtl: true,
    is_default: false,
    created_at: '2018-06-24T18:16:38.000000Z',
    updated_at: '2018-06-24T18:16:38.000000Z',
    lang_ar: 'عربى'
  },
  {
    id: 4,
    lang: 'Arabic',
    native: 'عربى',
    iso_code: 'ar',
    is_active: true,
    is_rtl: true,
    is_default: false,
    created_at: '2018-06-24T18:16:38.000000Z',
    updated_at: '2018-06-24T18:16:38.000000Z',
    lang_ar: 'عربى'
  },
  {
    id: 5,
    lang: 'Arabic',
    native: 'عربى',
    iso_code: 'ar',
    is_active: true,
    is_rtl: true,
    is_default: false,
    created_at: '2018-06-24T18:16:38.000000Z',
    updated_at: '2018-06-24T18:16:38.000000Z',
    lang_ar: 'عربى'
  }
]

export default function SystemAdminLanguagesTab() {
  // ** declare and define component state and variables
  const [data, setData] = useState<LanguageType[]>(mockData)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<LanguageType, any>[]>(
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
      columnHelper.accessor('lang', {
        header: 'أسم اللغة بالانجليزية',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.lang}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('lang_ar', {
        header: 'أسم اللغة بالعربي',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.lang_ar}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('iso_code', {
        header: 'ISO Code',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.iso_code}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('is_rtl', {
        header: 'اتجاة اللغة',
        cell: ({ row }) => (
          <Typography color='text.primary'>
            {row.original.is_rtl ? 'من اليمين الى اليسار' : 'من اليسار الى اليمين'}
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

type PropsType = {}
