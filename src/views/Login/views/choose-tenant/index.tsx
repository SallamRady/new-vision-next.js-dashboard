'use client'

import { useContext, useState } from 'react'

import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import CompanyCard from './CompanyCard'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { removeKeyFromLocalStorage } from '@/utils/local.storage'

function ChooseCorrentTenant() {
  const [shoeMore, setShoeMore] = useState(false)
  const { tenants, handleChangeView } = useContext(AuthOperationsContext)
  const sliceLen = tenants?.length > 3 ? 3 : tenants?.length

  const handleStepBack = () => {
    removeKeyFromLocalStorage('globalId')
    handleChangeView(LoginPageViews.MAIN_PAGE)
  }

  return (
    <Container maxWidth='md'>
      <Stack>
        <Card>
          <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={'100%'}>
            <Button
              variant='text'
              sx={{ fontWeight: 700, fontSize: 22 }}
              startIcon={<i className='ri-arrow-right-line'></i>}
              onClick={() => {
                handleStepBack()
              }}
            >
              العودة
            </Button>
            {tenants.length > 3 && (
              <Button
                variant='text'
                sx={{ fontWeight: 700, fontSize: 22, textDecoration: 'underline' }}
                onClick={() => setShoeMore(true)}
                disabled={shoeMore}
              >
                المزيد
              </Button>
            )}
          </Stack>
          <Typography variant='body2' textAlign={'center'} fontSize={22} fontWeight={800}>
            الشركات المسجلة
          </Typography>
          <Grid container>
            {(shoeMore ? tenants : tenants?.slice(0, sliceLen))?.map(tenant => (
              <CompanyCard key={tenant.id} tenant={tenant} />
            ))}
          </Grid>
        </Card>
        <Typography variant='body2' color='error'></Typography>
      </Stack>
    </Container>
  )
}

export default ChooseCorrentTenant
