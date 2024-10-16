'use client'
// import packages
import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import type { CompanyTableRowType } from '@/types/companies/CompanyTableRowType'
import SetCompanyDialogForm from './components/SetCompanyDialog'
import { SuccessMessage } from '@/utils/notificationsMessages'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<CompanyTableRowType>()

const mockData: CompanyTableRowType[] = [
  {
    id: 1,
    title: 'company num 1',
    email: 'company1@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: false
  },
  {
    id: 2,
    title: 'company num 2',
    email: 'company2@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: false
  },
  {
    id: 3,
    title: 'company num 3',
    email: 'company3@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 4,
    title: 'company num 4',
    email: 'company4@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 5,
    title: 'company num 5',
    email: 'company5@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 6,
    title: 'company num 6',
    email: 'company6@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 7,
    title: 'company num 7',
    email: 'company7@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 8,
    title: 'company num 8',
    email: 'company8@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 9,
    title: 'company num 9',
    email: 'company9@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: false
  },
  {
    id: 10,
    title: 'company num 10',
    email: 'company10@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 11,
    title: 'company num 11',
    email: 'company11@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: true
  },
  {
    id: 12,
    title: 'company num 12',
    email: 'company12@gmail.com',
    phone: '0124536752',
    package: 'Plus',
    endDate: '08/05/2026',
    companyType: 'خدمات الكترونية',
    activationStatus: false
  }
]

export default function CompaniesDataTable() {
  // ** declare and define component state and variables
  //const [data, setData] = useState<CompanyTableRowType[]>(mockData)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<CompanyTableRowType, any>[]>(
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
        header: 'الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.title}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('email', {
        header: 'البريد الالكتروني',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.email}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('companyType', {
        header: 'نوع الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.companyType}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('package', {
        header: 'الباقة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.package}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('endDate', {
        header: 'تاريخ الانتهاء',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.endDate}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('activationStatus', {
        header: 'الحالة',
        cell: ({ row }) => {
          if (row.original.activationStatus == true) return <Chip label='فعال' color='success' variant='tonal' />
          return <Chip label='معطل' color='warning' variant='tonal' />
        },
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
  const OnSuccessDialogAction = () => {
    SuccessMessage('تم أضافة الشركة بنجاح')
    setOpenAddDialog(false)
  }

  // ** return component ui
  return (
    <GenericDataTable
      data={mockData}
      columns={columns}
      addButtonLabel='انشاء شركة'
      addDialogContent={
        <>
          <SetCompanyDialogForm open={openAddDialog} OnSuccessDialogAction={OnSuccessDialogAction} />
        </>
      }
      exportButtonLabel='تصدير'
      globalFilterPlaceholder='بحث...'
      onExport={() => console.log('Export users clicked')}
      setOpenAddDialog={setOpenAddDialog}
      openAddDialog={openAddDialog}
    />
  )
}
