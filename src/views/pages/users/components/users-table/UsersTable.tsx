'use client'
// import packages
import { UsersTableRowType } from '@/types/users/users-page-types'
import { Checkbox, Chip, IconButton, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import AddUserDialogContent from './components/AddUser'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UsersTableRowType>()

const mockData: UsersTableRowType[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    title: 'Software Engineer',
    phone: '123-456-7890',
    branch: 'Finance',
    company: 'ABC Corp',
    userType: 'Admin',
    completionStatus: false
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 3,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 4,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 5,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 6,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 7,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 8,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 9,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 10,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 11,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 12,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 13,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 14,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  },
  {
    id: 15,
    name: 'User3',
    email: 'User3@example.com',
    title: 'Software Engineer',
    phone: '987-654-3210',
    branch: 'HR',
    company: 'XYZ Inc',
    userType: 'Employee',
    completionStatus: true
  }
]

export default function UsersDataTable() {
  // ** declare and define component state and variables
  const [data, setData] = useState<UsersTableRowType[]>(mockData)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<UsersTableRowType, any>[]>(
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
        header: 'الاسم',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('userType', {
        header: 'نوع المستخدم',
        cell: ({ row }) => (
          <Typography color='text.primary'>{row.original.userType == 'Admin' ? 'مستخدم' : 'موظف'}</Typography>
        ),
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('email', {
        header: 'البريد الالكتروني',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.email}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('phone', {
        header: 'رقم الجوال',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.phone}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('branch', {
        header: 'الفرع',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.branch}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('company', {
        header: 'الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.company}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('completionStatus', {
        header: 'حالة الموظف',
        cell: ({ row }) => {
          if (row.original.completionStatus == true) return <Chip label='مكتمل' color='success' variant='tonal' />
          return <Chip label='غير مكتمل' color='warning' variant='tonal' />
        },
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
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
      addButtonLabel='أضافة مستخدم'
      addDialogContent={<AddUserDialogContent />}
      exportButtonLabel='تصدير'
      globalFilterPlaceholder='بحث...'
      onExport={() => console.log('Export users clicked')}
    />
  )
}

type PropsType = {}
