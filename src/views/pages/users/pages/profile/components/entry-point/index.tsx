import { Grid } from '@mui/material'
import UserProfileHeaderCard from '../profile-header'

export default function UserProfileEntryPoint() {
  return (
    <Grid container spacing={6}>
      {/* User Header Card */}
      <Grid item xs={12}>
        {/* User Profile Header */}
        <UserProfileHeaderCard />
      </Grid>
    </Grid>
  )
}
