'use client'
// import packages
import { UserType } from '@/types/users/users-page-types'
import { Checkbox, Chip, IconButton, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import AddUserDialogContent from './components/AddUser'
import useUsersData from '@/hooks/useUsersData'
import Loader from '@/components/Loader'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UserType>()

export default function UsersDataTable() {
  // ** declare and define component state and variables
  const { data, isLoading, isError, refetch } = useUsersData()
  const [dialogOpenned, setDialogOpenned] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)
  //UserType

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<UserType, any>[]>(
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
      // optionals
      {
        id: 'title',
        header: 'المسمى الوظيفي',
        cell: ({ row }) => <Typography color='text.primary'>_</Typography>
      },
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
      {
        id: 'branch',
        header: 'الفرع',
        cell: ({ row }) => <Typography color='text.primary'>_</Typography>
      },
      columnHelper.accessor('tenants', {
        header: 'الشركة',
        cell: ({ row }) => {
          return (
            <Stack width={'100%'} direction={'row'} flexWrap={'wrap'} spacing={2}>
              {row.original.tenants?.map(ele => <Chip key={ele.id} label={ele.name} color='default' variant='tonal' />)}
            </Stack>
          )
        },
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('status', {
        header: 'حالة الموظف',
        cell: ({ row }) => {
          if (row.original.status == true) return <Chip label='مكتمل' color='success' variant='tonal' />
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
  const durringFireAddFun = () => {
    setDialogOpenned(prev => !prev)
  }
  const OnSuccessDialogAction = () => {
    setOpenAddDialog(false)
    refetch()
  }

  // ** return component ui
  if (isLoading) return <Loader />

  return (
    <>
      <GenericDataTable
        data={data || []}
        columns={columns}
        addButtonLabel={
          <Typography variant='body2' fontWeight={700} fontSize={20}>
            أضافة مستخدم
          </Typography>
        }
        durringFireAddFun={durringFireAddFun}
        addDialogContent={<AddUserDialogContent OnSuccessDialogAction={OnSuccessDialogAction} open={dialogOpenned} />}
        exportButtonLabel='تصدير'
        globalFilterPlaceholder='بحث...'
        onExport={() => console.log('Export users clicked')}
        setOpenAddDialog={setOpenAddDialog}
        openAddDialog={openAddDialog}
      />
    </>
  )
}

type PropsType = {}
