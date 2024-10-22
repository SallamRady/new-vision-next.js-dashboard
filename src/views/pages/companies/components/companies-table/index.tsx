'use client'

import { Card, CardContent, MenuItem, Pagination, Stack, TextField } from '@mui/material'

// Style Imports
import { useHooks } from './useHooks'
import SearchInput from './components/SearchInput'
import RenderCompainesTable from './components/Table'

export default function CompaniesDataTable() {
  const { columns, companiesContext } = useHooks()
  const { page, setPage, query, search, limit, setLimit } = companiesContext

  // ** return component ui
  return (
    <>
      <Card>
        <RenderCompainesTable
          searchElement={<SearchInput />}
          key={[page, search, limit].join()}
          columns={columns}
          data={query.data?.tenants.data}
        />
        <CardContent>
          <Stack direction='row'>
            <Pagination
              sx={{ flexGrow: 1 }}
              page={page}
              onChange={(e, page) => setPage(page)}
              count={query.data?.tenants.last_page || 1}
            />

            <TextField
              select
              value={limit}
              onChange={e => {
                setLimit(e.target.value)
              }}
              label='الصفوف في الصفحة'
              sx={{ minWidth: 200 }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={100}>100</MenuItem>
              <MenuItem value={200}>200</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}
