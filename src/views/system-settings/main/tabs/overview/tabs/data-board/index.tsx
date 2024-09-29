import { Grid } from '@mui/material'
import DetailsCard from './DetailsCard'
import ProfitsCard from './ProfitsCard'
import PackagesCard from './PackagesCard'
import CompaniesCard from './CompaniesCard'
import PackagesSubscriptions from './PackagesSubscriptions'

function DataBoard() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={4}>
        <DetailsCard />
      </Grid>
      <Grid item xs={12} md={6} lg={8}>
        <div>
          <Grid
            container
            spacing={2}
            sx={{
              '.MuiCard-root': {
                height: 1
              }
            }}
          >
            <Grid item xs={12} md={6}>
              <ProfitsCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <PackagesCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <CompaniesCard />
            </Grid>
            <Grid item xs={12} md={6}>
              <PackagesSubscriptions />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

export default DataBoard
