import { Grid } from '@mui/material'

import TotalVisits from '@components/cards/total-visits'
import CardStatWithImage from '@/components/card-statistics/Character'
import FinancialReport from '../profile/FinancialReport'
import ShiftTime from '../profile/ShiftTime'

const TopCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={3}>
        <TotalVisits />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <ShiftTime />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <FinancialReport />
      </Grid>
      <Grid item xs={12} md={6} lg={3}>
        <CardStatWithImage
          stats='لا يوجد مهام'
          title='المهام'
          trendNumber=''
          chipColor='primary'
          chipText={``}
          src='/images/illustrations/characters/10.png'
        />
      </Grid>
    </Grid>
  )
}

export default TopCards
