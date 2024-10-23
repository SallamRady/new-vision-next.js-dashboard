import type { SetStateAction } from 'react'

import { Button, Grid, TextField } from '@mui/material'

import AddLabelToEl from '@/components/AddLabelToEl'
import SetAddressGoogleMap from './GoogleMap'

const GridItem = (props: childrenProps) => (
  <Grid item xs={12} md={5.8}>
    {props.children}
  </Grid>
)

export default function AddressDialogContent(props: PropsType) {
  // declare and define component state and varables
  const { setOpen } = props

  // declare and define component helper methods
  const handleClose = () => setOpen(false)

  return (
    <Grid container gap={6}>
      <GridItem>
        <AddLabelToEl label='خط الطول'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <GridItem>
        <AddLabelToEl label='خط العرض'>
          <TextField size='small' />
        </AddLabelToEl>
      </GridItem>

      <Grid item xs={12}>
        {/* map */}
        <SetAddressGoogleMap />
      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 5 }}>
        <Button variant='contained' sx={{ mx: 1 }}>
          حفظ
        </Button>
        <Button variant='outlined' sx={{ mx: 1 }} color='inherit' onClick={handleClose}>
          الغاء
        </Button>
      </Grid>
    </Grid>
  )
}

type childrenProps = {
  children: React.ReactNode
}

type PropsType = {
  setOpen: React.Dispatch<SetStateAction<boolean>>
}
