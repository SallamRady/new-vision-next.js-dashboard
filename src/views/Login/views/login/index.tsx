'use client'

import { Button, Card, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'

import axios from 'axios'
import { Api } from '@/Constants/Api'
import { useContext, useState } from 'react'
import { TenentType } from '@/types/tenant'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'

function LoginView() {
  // ** declare and define component state and variables
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [identifier, setIdentifier] = useState('')
  const { handleChangeView, storeTenants, storeGlobalId, storeSelectedTenant } = useContext(AuthOperationsContext)
  // ** declare and define component helper methods
  function handleSendIdentifier() {
    // declare helper variables
    const url = Api(`identifier-check`)
    const body = { identifier }
    const headers = {
      'Content-Type': 'application/json'
    }
    type ResType = {
      global_id?: number
      msg?: string
      tenants?: TenentType[]
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
          if (response.data.tenants) {
            let tenants: TenentType[] = response.data.tenants

            if (tenants.length > 1) {
              //allow users to choose corrct company
              storeTenants(tenants)
              handleChangeView(LoginPageViews.Multi_TENANTS)
            } else if (tenants.length == 1) {
              //redirect to correct login page
              storeSelectedTenant(tenants[0])
              let lookUp = tenants?.[0]?.login_ways?.[0]?.lookup
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
              onChange={e => {
                if (e.target.value.length == 0) setError(true)
                else setError(false)

                setIdentifier(e.target.value)
              }}
              helperText={error ? 'لابد من أدخال المعرف لتتمكن من تسجيل الدخول' : ''}
              label='ادخل المعرف الخاص بك :البريد الالكتروني / رقم الهوية ..'
            />

            <Button fullWidth variant='contained' type='submit' disabled={identifier.length == 0}>
              تسجيل الدخول
            </Button>

            <Divider className='gap-3 text-textPrimary'>أو</Divider>
            <Button fullWidth variant='contained' type='submit' color='secondary'>
              تسجيل الدخول عن طريق بوابة نفاذ
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginView
