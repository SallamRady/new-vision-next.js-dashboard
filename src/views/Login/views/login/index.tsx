'use client'

// MUI
import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'

// import packages
import axios from 'axios'
import { api } from '@/Constants/Api'
import { useContext, useState } from 'react'
import { TenentType } from '@/types/tenant'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { StoreInLocalStorage } from '@/utils/local.storage'

// assets
import NafazImg from '@/assets/images/logos/nfaz.png'
import gmailImg from '@/assets/images/logos/Gmail-Logo.png'
import yahooImg from '@/assets/images/logos/yahoo-logo.png'

function LoginView() {
  // ** declare and define component state and variables
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const { handleChangeView, storeTenants, storeGlobalId, storeSelectedTenant, handleSetPassword, handleSetIdentifier } =
    useContext(AuthOperationsContext)

  const ImgStyle = {
    cursor: 'pointer'
  }

  // ** declare and define component helper methods
  function handleSendIdentifier() {
    //set identifier to context
    handleSetIdentifier(identifier)

    // declare helper variables
    const url = api`identifier-check`
    const body = { identifier }
    const headers = {
      'Content-Type': 'application/json'
    }

    type ResType = {
      global_id?: number
      msg?: string
      tenants?: TenentType[]
      can_set_pass?: boolean
    }

    // send request
    setLoading(true)

    axios
      .post<ResType>(url, body, {
        headers: headers
      })
      .then(response => {
        // check error message is exist ?
        if (response.data?.msg) {
          errorMessage(response.data?.msg)
        } else if (response.data?.global_id) {
          storeGlobalId(response.data?.global_id)
          StoreInLocalStorage('globalId', response.data.global_id.toString())

          if (response.data.tenants) {
            const tenants: TenentType[] = response.data.tenants

            if (tenants.length > 1) {
              //allow users to choose corrct company
              if (response.data?.can_set_pass) {
                handleSetPassword(true)
              }
              storeTenants(tenants)
              handleChangeView(LoginPageViews.Multi_TENANTS)
            } else if (tenants.length == 1) {
              storeSelectedTenant(tenants[0])

              if (response.data?.can_set_pass) {
                handleChangeView(LoginPageViews.SetPassword)
                return
              }
              //redirect to correct login page
              const lookUp = tenants?.[0]?.login_ways?.[0]?.lookup
              switch (lookUp.name) {
                case LoginPageViews.PASSWORD:
                  handleChangeView(LoginPageViews.PASSWORD)
                  break
                case LoginPageViews.OTP:
                  handleChangeView(LoginPageViews.OTP)
                  break
              }
            }
          }
        }
      })
      .catch(err => {
        errorMessage('خطا غير متوقع برجاء المحاولة فى وقت اخر')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // ** component ui
  return (
    <Card className='flex flex-col sm:is-[460px]'>
      {/* card header */}
      <CardHeader
        title={
          <Typography variant='h4' fontWeight={600} fontSize={26} textAlign={'center'}>
            تسجيل الدخول
          </Typography>
        }
      ></CardHeader>
      {/* card content */}
      <CardContent className='p-6 sm:!p-12'>
        <div className='flex flex-col gap-5'>
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              handleSendIdentifier()
            }}
            className='flex flex-col gap-5'
          >
            <TextField
              autoFocus
              fullWidth
              error={error}
              variant='standard'
              onChange={e => {
                if (e.target.value.length == 0) setError(true)
                else setError(false)

                setIdentifier(e.target.value)
              }}
              disabled={loading}
              helperText={error ? 'لابد من أدخال المعرف لتتمكن من تسجيل الدخول' : ''}
              label='ادخل رقم الجوال / البريد الالكتروني'
            />

            <Button fullWidth variant='contained' type='submit' disabled={identifier.length == 0 || loading}>
              التالي
            </Button>

            {/*
            <Divider className='gap-3 text-textPrimary'>أو</Divider>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'}>
              <Image src={yahooImg.src} alt='nafaz image' width={30} height={30} style={ImgStyle} />
              <Image src={gmailImg.src} alt='nafaz image' width={30} height={30} style={ImgStyle} />
              <Image src={NafazImg.src} alt='nafaz image' width={30} height={30} style={ImgStyle} />
            </Stack>
            */}
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginView
