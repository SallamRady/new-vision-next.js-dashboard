'use client'
// import packages
import { Button, Checkbox, Chip, IconButton, Paper, Tooltip, Typography } from '@mui/material'
import { createColumnHelper } from '@tanstack/react-table'
import type { ColumnDef } from '@tanstack/react-table'

// Style Imports
import { useContext, useMemo, useState } from 'react'
import GenericDataTable from '@/components/tables/GenericDataTable'
import SetCompanyDialogForm from './components/SetCompanyDialog'
import { SuccessMessage } from '@/utils/notificationsMessages'
import { TenantType } from '@/types/companies/CompanyTableRowType'
import { ComponiesCxt } from '../../context/ComponiesCxt'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<TenantType>()

export default function CompaniesDataTable() {
  // ** declare and define component state and variables
  const { companiesData } = useContext(ComponiesCxt)
  const [openAddDialog, setOpenAddDialog] = useState(false)

  // declare tanstack table columns
  const columns = useMemo<ColumnDef<TenantType, any>[]>(
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
        header: 'الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('email', {
        header: 'البريد الالكتروني',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.email}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('registration_type', {
        header: 'نوع الشركة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.registration_type?.name}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('package', {
        header: 'الباقة',
        cell: ({ row }) => <Typography color='text.primary'>{row.original.package?.name ?? '_'}</Typography>,
        enableHiding: true // Allow hiding this column
      }),
      columnHelper.accessor('status', {
        header: 'الحالة',
        cell: ({ row }) => {
          if (row.original.status == -1) return <Chip label='استكمال بيانات' color='warning' variant='tonal' />
          return <Chip label='Unkowen' color='error' variant='tonal' />
        },
        enableHiding: true // Allow hiding this column
      }),
      {
        id: 'setting',
        header: 'الأعدادات',
        cell: () => (
          <>
            <Tooltip
              arrow
              placement='left'
              title={
                <Paper>
                  <Button>Test</Button>
                </Paper>
              }
            >
              <IconButton color='default'>
                <i className='ri-more-2-line' />
              </IconButton>
            </Tooltip>
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
      data={companiesData || []}
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
