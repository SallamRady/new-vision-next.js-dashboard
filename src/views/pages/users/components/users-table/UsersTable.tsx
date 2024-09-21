'use client'
// import packages
import { UsersTableRowType } from '@/types/users/users-page-types'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Chip,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {
  ColumnDef,
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'

// Style Imports
import tableStyles from '@core/styles/table.module.css'
import { useMemo, useState } from 'react'
import { rankItem } from '@tanstack/match-sorter-utils'
import classNames from 'classnames'

// define column helper that will help to create tanstack table columns
const columnHelper = createColumnHelper<UsersTableRowType>()

//define fuzzyFilter function used in filters
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({ itemRank })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

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
  }
]

export default function UsersDataTable() {
  // ** declare and define component state and variables
  const [data, setData] = useState<UsersTableRowType[]>(mockData)
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState({
    name: true,
    email: true,
    phone: true,
    branch: true,
    company: true
  })

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
  // declare tanstack table instance
  const table = useReactTable({
    columns,
    data,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter,
      columnVisibility
    },
    initialState: {
      pagination: {
        pageSize: 7
      }
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection, // Add this to update row selection
    enableHiding: true,
    onColumnVisibilityChange: setColumnVisibility, // Handle column visibility changes
    //enable serch
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    //others models
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <Card>
      <CardHeader
        title={
          <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack width={'60%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <TextField
                variant='outlined'
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder='بحث'
                size='small'
                sx={{ width: '80%' }}
              />
              <Button variant='contained'>اضافة موظف</Button>
            </Stack>

            <Button variant='outlined' endIcon={<i className='ri-upload-2-line'></i>}>
              تصدير
            </Button>
          </Stack>
        }
      />
      {/* control visibility of columns in table */}
      <Accordion>
        <AccordionSummary id='control-visibility-table-columns' aria-controls='panel-control-visibility-table-columns'>
          <Stack direction={'row'} spacing={2} alignItems={'center'}>
            <i className='ri-eye-line'></i>
            <Typography variant='body1' fontSize={'1rem'} p={2}>
              التحكم فى ظهور أعمدة البيانات
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <div className='flex gap-2 p-2'>
            {/* Add column visibility toggles */}
            {table
              .getAllColumns()
              .map(
                column =>
                  column.getCanHide() && (
                    <FormControlLabel
                      key={column.id}
                      control={
                        <Checkbox checked={column.getIsVisible()} onChange={column.getToggleVisibilityHandler()} />
                      }
                      label={typeof column.columnDef.header === 'function' ? column.id : column.columnDef.header}
                    />
                  )
              )}
          </div>
        </AccordionDetails>
      </Accordion>
      {/* Data Table */}
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={classNames({
                          'flex items-center': header.column.getIsSorted(),
                          'cursor-pointer select-none': header.column.getCanSort()
                        })}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: <i className='ri-arrow-up-s-line text-xl' />,
                          desc: <i className='ri-arrow-down-s-line text-xl' />
                        }[header.column.getIsSorted() as 'asc' | 'desc'] ?? null}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            ) : (
              table
                .getRowModel()
                .rows.slice(0, table.getState().pagination.pageSize)
                .map(row => {
                  return (
                    <tr key={row.id} className={classNames({ selected: row.getIsSelected() })}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                      ))}
                    </tr>
                  )
                })
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

type PropsType = {}
