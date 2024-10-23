'use client'

// import packages
import { useMemo, useState } from 'react'

import { Box, Checkbox, Stack, Typography } from '@mui/material'

import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

import GenericDataTable from '@/components/tables/GenericDataTable'
import type { UserType } from '@/types/users/users-page-types'
import FieldSet from '@/components/FieldSet'
import SettingBtnMenu from './components/SettingBtnMenu'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UserType>()

export default function CompanyAdminsUsersData() {
  // ** declare and define component state and variables
  const [dialogOpenned, setDialogOpenned] = useState(false)
  const [continueEditting, setContinueEditting] = useState(false)

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
      {
        id: 'title',
        header: 'رقم المعرف',
        cell: () => <Typography color='text.primary'>_</Typography>
      },
      {
        id: 'title',
        header: 'نوع المعرف',
        cell: () => <Typography color='text.primary'>_</Typography>
      },
      columnHelper.accessor('phone', {
        header: 'رقم الجوال',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.phone}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('email', {
        header: 'البريد الالكتروني',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.email}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'branch',
        header: 'الدور',
        cell: () => <Typography color='text.primary'>_</Typography>
      },
      {
        id: 'branch',
        header: 'الفرع',
        cell: () => <Typography color='text.primary'>_</Typography>
      },
      {
        id: 'branch',
        header: 'الجنسية',
        cell: () => <Typography color='text.primary'>_</Typography>
      },
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: () => <>000</>
      }
    ],
    []
  )

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <FieldSet
      leftTitle={
        <Typography variant='body2' fontSize={18} fontWeight={700}>
          بيانات المستخدم الرئيسي
        </Typography>
      }
      rightTitle={<SettingBtnMenu setContinueEditting={setContinueEditting} />}
    >
      <Stack m={2} p={2}>
        {continueEditting ? (
          <GenericDataTable
            data={[]}
            columns={columns}
            exportButtonLabel='تصدير'
            globalFilterPlaceholder='بحث...'
            onExport={() => console.log('Export users clicked')}
            openAddDialog={dialogOpenned}
            setOpenAddDialog={setDialogOpenned}
            hideTableHeader={true}
          />
        ) : (
          <Stack width={'100%'} alignItems={'center'} justifyContent={'center'} my={3}>
            <Box
              sx={{
                width: '260px',
                height: '170px',
                boxShadow: '0px 8.07px 24.22px -4.04px #0000001F',
                bgcolor: '#2D174D',
                textAlign: 'center',
                p: '41px'
              }}
            >
              <i className='ri-error-warning-line text-warning text-lg'></i>
              <Typography variant='body2' fontSize={18} fontWeight={600}>
                سيتم التشغيل بعد اضافة <br />
                مستخدم رئيسي واحد اولا
              </Typography>
            </Box>
          </Stack>
        )}
      </Stack>
    </FieldSet>
  )
}
