'use client'
// import packages
import { UserType } from '@/types/users/users-page-types'
import { Checkbox, Chip, Stack, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import Loader from '@/components/Loader'
import { useContext, useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import AddUserDialogContent from './components/AddUserDialog'
import ActionButton from './components/ActionButton'
import { UsersContext } from '../../context'
import EditUserDialog from './components/EditUserDialog'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UserType>()

export default function UsersDataTable() {
  // ** declare and define component state and variables
  const { users, handleChangeFormMode, formMode, usersIsLoading, refreshUserData } = useContext(UsersContext)
  const [dialogOpenned, setDialogOpenned] = useState(false)
  const [openAddDialog, setOpenAddDialog] = useState(false)

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
          if (row.original.status == -1) return <Chip label='استكمال بيانات' color='warning' variant='tonal' />
          return <Chip label='Status unknown' color='error' variant='tonal' />
        },
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: ({ row }) => (
          <ActionButton
            row={row.original}
            setOpenAddDialog={setOpenAddDialog}
            OnSuccessDeleteDialogAction={OnSuccessDeleteDialogAction}
          />
        )
      }
    ],
    []
  )

  // ** declare and define component helper methods
  const durringFireAddFun = () => {
    handleChangeFormMode('Create')
    setDialogOpenned(prev => !prev)
  }
  const OnSuccessDialogAction = () => {
    setOpenAddDialog(false)
    refreshUserData()
  }
  const OnSuccessDeleteDialogAction = () => {
    // refetch()
  }

  // ** return component ui
  if (usersIsLoading) return <Loader />

  return (
    <>
      <GenericDataTable
        data={users || []}
        columns={columns}
        addButtonLabel={` أضافة مستخدم`}
        durringFireAddFun={durringFireAddFun}
        addDialogContent={
          formMode == 'Create' ? (
            <AddUserDialogContent OnSuccessDialogAction={OnSuccessDialogAction} open={dialogOpenned} />
          ) : (
            <EditUserDialog OnSuccessDialogAction={OnSuccessDialogAction} open={openAddDialog} />
          )
        }
        exportButtonLabel='تصدير'
        globalFilterPlaceholder='بحث...'
        onExport={() => console.log('Export users clicked')}
        setOpenAddDialog={setOpenAddDialog}
        openAddDialog={openAddDialog}
        addDialogTitile={formMode == 'Create' ? 'أضافة مستخدم' : 'تعديل مستخدم'}
      />
    </>
  )
}
