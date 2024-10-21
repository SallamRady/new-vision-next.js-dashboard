'use client'

import { useContext } from 'react'

import Image from 'next/image'

import { Grid, Stack, Typography } from '@mui/material'

import type { TenentType } from '@/types/tenant'
import { AuthOperationsContext, LoginPageViews } from '../../context'

export default function CompanyCard(props: PropsType) {
  const { handleChangeView, storeSelectedTenant, setPassword, handleSetPassword } = useContext(AuthOperationsContext)

  const handleClick = () => {
    storeSelectedTenant(props.tenant)

    if (setPassword) {
      handleSetPassword(false)
      handleChangeView(LoginPageViews.SetPassword)

      return
    }

    switch (props.tenant.login_ways?.[0]?.lookup?.name) {
      case LoginPageViews.OTP:
        handleChangeView(LoginPageViews.OTP)
        break
      case LoginPageViews.PASSWORD:
        handleChangeView(LoginPageViews.PASSWORD)
        break
    }
  }

  return (
    <Grid
      item
      xs={3.7}
      sx={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        padding: '1.3rem',
        margin: '0.2rem',
        ':hover': {
          bgcolor: '#8080801c'
        }
      }}
      onClick={handleClick}
    >
      <Stack alignContent={'center'} justifyContent={'center'} spacing={4}>
        <Stack
          width={'100px'}
          height={'100px'}
          alignItems={'center'}
          justifyContent={'center'}
          bgcolor={'#463361'}
          borderRadius={'13px'}
        >
          <Image src={props.tenant?.media?.[0]?.original_url ?? ''} alt='tenant image' width={60} height={60} />
        </Stack>
        <Typography gutterBottom variant='h5' component='div' textAlign={'center'}>
          {props.tenant?.name}
        </Typography>
      </Stack>
    </Grid>
  )
}

type PropsType = {
  tenant: TenentType
}
