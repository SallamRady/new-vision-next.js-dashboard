import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardHeader,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn
} from '@tanstack/react-table'
// Import styles
import classNames from 'classnames'
import tableStyles from '@core/styles/table.module.css'
import { rankItem } from '@tanstack/match-sorter-utils'
// Import media
import iconCarrierImg from '@assets/icons/SVGRepo_iconCarrier.png'
import Image from 'next/image'
import LeftSlideInDialog from '@/components/dialogs/left-dialog'

// Define a fuzzy filter function
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ itemRank })
  return itemRank.passed
}

// declare props type
type GenericDataTableProps<T> = {
  data: T[]
  columns: ColumnDef<T, any>[]
  globalFilterPlaceholder?: string
  addButtonLabel?: string
  exportButtonLabel?: string
  onAdd?: () => void
  onExport?: () => void
}

export default function GenericDataTable<T>({
  data,
  columns,
  globalFilterPlaceholder = 'Search...',
  addButtonLabel = 'Add Item',
  exportButtonLabel = 'Export',
  onAdd,
  onExport
}: GenericDataTableProps<T>) {
  // ** declare and define component state and variables
  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')
  const [columnVisibility, setColumnVisibility] = useState({})
  const [columnsVisibilityFilters, setColumnsVisibilityFilters] = useState('')
  const [openColumnVisibilityControlDialog, setOpenColumnVisibilityControlDialog] = useState(false)

  // ** declare the table instance
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      rowSelection,
      globalFilter,
      columnVisibility
    },
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: fuzzyFilter,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel()
  })

  return (
    <Card>
      {/* header of card */}
      <CardHeader
        title={
          <Stack width={'100%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Stack width={'60%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <TextField
                variant='outlined'
                value={globalFilter ?? ''}
                onChange={e => setGlobalFilter(e.target.value)}
                placeholder={globalFilterPlaceholder}
                size='small'
                sx={{ width: '80%' }}
              />
              {onAdd && (
                <Button variant='contained' onClick={onAdd}>
                  {addButtonLabel}
                </Button>
              )}
            </Stack>
            <Stack width={'15%'} direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              {onExport && (
                <Button variant='outlined' endIcon={<i className='ri-upload-2-line'></i>} onClick={onExport}>
                  {exportButtonLabel}
                </Button>
              )}
              <Image
                src={iconCarrierImg.src}
                alt='iconCarrierImg icon'
                width={20}
                height={20}
                style={{
                  cursor: 'pointer'
                }}
                onClick={() => {
                  setOpenColumnVisibilityControlDialog(true)
                }}
              />
            </Stack>
          </Stack>
        }
      />
      {/* control visibility of table columns */}
      <LeftSlideInDialog
        open={openColumnVisibilityControlDialog}
        setOpen={setOpenColumnVisibilityControlDialog}
        title='التنقية'
        dialogContent={
          <Stack spacing={1}>
            <TextField
              fullWidth
              id='ColumnVisibilityFilter'
              label=''
              size='small'
              placeholder='بحث'
              onChange={e => setColumnsVisibilityFilters(e.target.value)}
            />
            {table
              .getAllColumns()
              .filter(column => {
                if (typeof column.columnDef.header === 'function') return column.id.includes(columnsVisibilityFilters)
                else return column.columnDef.header?.includes(columnsVisibilityFilters)
              })
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
          </Stack>
        }
      />
      {/* data table */}
      <div className='overflow-x-auto'>
        <table className={tableStyles.table}>
          {/* set table headers */}
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
                        {header.column.getIsSorted() && (
                          <>
                            {header.column.getIsSorted() === 'asc' ? (
                              <i className='ri-arrow-up-s-line text-xl' />
                            ) : (
                              <i className='ri-arrow-down-s-line text-xl' />
                            )}
                          </>
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {/* set data body */}
          <tbody>
            {table.getFilteredRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className={classNames({ selected: row.getIsSelected() })}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
