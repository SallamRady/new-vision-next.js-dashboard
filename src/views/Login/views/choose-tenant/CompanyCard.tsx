'use client'

import { useContext } from 'react'
import { TenentType } from '@/types/tenant'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'

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
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component='img'
          height='140'
          image={props.tenant?.media?.[0]?.original_url ?? ''}
          alt='green iguana'
        />
        <CardContent>
          <Typography gutterBottom variant='h5' component='div' textAlign={'center'}>
            {props.tenant?.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

type PropsType = {
  tenant: TenentType
}
