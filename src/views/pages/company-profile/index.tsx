import { Grid, Stack } from '@mui/material'

import CompanyProfileHeader from './components/top-card'
import CompanyPackageCard from './components/package-card'
import CompanyEmployeesCard from './components/employees-card'

export default function CompanyDetailsPage() {
  return (
    <Stack spacing={2}>
      {/* header */}
      <CompanyProfileHeader />
      <Grid container>
        {/* package card */}
        <Grid xs={12} md={4}>
          <CompanyPackageCard />
        </Grid>
        <Grid xs={0.5}></Grid>
        {/* Employees */}
        <Grid xs={12} md={7.5}>
          <CompanyEmployeesCard />
        </Grid>
      </Grid>
    </Stack>
  )
}
