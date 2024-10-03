'use client'

import { useContext, useState } from 'react'

import { Container, Stack, Typography } from '@mui/material'
import CompanyCard from './CompanyCard'
import { AuthOperationsContext } from '../../context'

function ChooseCorrentTenant() {
  const { tenants } = useContext(AuthOperationsContext)

  return (
    <Container maxWidth='lg'>
      <Stack>
        <Stack justifyContent={'center'} alignItems={'center'} spacing={3} flexWrap={'wrap'} direction={'row'}>
          {tenants?.map(tenant => <CompanyCard key={tenant.id} tenant={tenant} />)}
        </Stack>
        <Typography variant='body2' color='error'></Typography>
      </Stack>
    </Container>
  )
}

export default ChooseCorrentTenant
