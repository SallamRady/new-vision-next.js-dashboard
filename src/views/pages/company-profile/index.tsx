import { Grid, Stack } from '@mui/material'

import CompanyProfileHeader from './components/top-card'
import CompanyPackageCard from './components/package-card'

export default function CompanyDetailsPage() {
  return (
    <Stack spacing={2}>
      {/* header */}
      <CompanyProfileHeader />
      <Grid container gap={3}>
        {/* package card */}
        <Grid xs={12} md={4}>
          <CompanyPackageCard />
        </Grid>
        {/* Employees */}
        <Grid xs={12} md={7}>
          Employees
        </Grid>
      </Grid>
    </Stack>
  )
}
