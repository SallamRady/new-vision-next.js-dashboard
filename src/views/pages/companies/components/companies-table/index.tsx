'use client'

import { Card, CardContent, MenuItem, Rating, Stack, TextField, Typography } from '@mui/material'

// Style Imports
import { useHooks } from './useHooks'
import SearchInput from './components/SearchInput'
import RenderCompainesTable from './components/Table'

export default function CompaniesDataTable() {
  const { columns, companiesContext } = useHooks()
  const { page, query, search, limit, setLimit } = companiesContext

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
          <Stack direction='row' alignItems={'center'} justifyContent={'space-between'}>
            {/* <Pagination page={page} onChange={(e, page) => setPage(page)} count={query.data?.tenants.last_page || 1} /> */}
            <div>
              <Rating max={2} disabled />
            </div>
            <Typography style={{ direction: 'ltr' }}>
              1-{Math.min(Number(limit || 0), Number(query.data?.tenants_count || 0))} of {query.data?.tenants_count}
            </Typography>

            <TextField
              select
              value={limit}
              onChange={e => {
                setLimit(e.target.value)
              }}
              size='small'
              label='الصفوف لكل الصفحة'
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
