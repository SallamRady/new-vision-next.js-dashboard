'use client'

import { Button, Card, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'

import axios from 'axios'
import { Api } from '@/Constants/Api'
import { useContext, useState } from 'react'
import { TenentType } from '@/types/tenant'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'

function PasswordView() {
  // ** declare and define component state and variables
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const { handleChangeView } = useContext(AuthOperationsContext)
  // ** declare and define component helper methods
  function handleSendPassword() {
    // declare helper variables
    const url = Api(`identifier-check`)
    const body = {}
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
      .post(url, body, {
        headers: headers
      })
      .then(response => {
        // check error message is exist ?
        console.log('sendPassword Response ', response)
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
              handleSendPassword()
            }}
            className='flex flex-col gap-5'
          >
            <TextField
              autoFocus
              fullWidth
              type='password'
              error={error}
              onChange={e => {
                if (e.target.value.length == 0) setError(true)
                else setError(false)

                setPassword(e.target.value)
              }}
              helperText={error ? 'كلمة المرور مطلوبة' : ''}
              label='أدخل كلمة المرور'
            />

            <Button fullWidth variant='contained' type='submit' disabled={password.length == 0}>
              تسجيل الدخول
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default PasswordView
