'use client'

import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'

import axios from 'axios'
import { Api } from '@/Constants/Api'
import { useContext, useEffect, useState } from 'react'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { StoreInLocalStorage } from '@/utils/local.storage'
import { redirect, useRouter } from 'next/navigation'

function PasswordView() {
  // ** declare and define component state and variables
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const { handleChangeView, globalId, selectedTenant } = useContext(AuthOperationsContext)

  // ** handle side effects
  useEffect(() => {
    setIsMounted(true) // Set mounted state to true after component mounts
  }, [])

  // ** declare and define component helper methods
  function handleSendPassword() {
    if (isMounted) {
      // declare helper variables
      const url = Api(`login-with-different-methods`)
      const body = { password, global_id: globalId }
      const headers = {
        'Content-Type': 'application/json',
        'X-Tenant': selectedTenant?.id
      }
      type ResType = {
        token: string
      }
      // send request
      setLoading(true)
      axios
        .post<ResType>(url, body, {
          headers: headers
        })
        .then(response => {
          // check error message is exist ?
          StoreInLocalStorage('token', response.data.token)
        })
        .then(() => {
          handleChangeView(LoginPageViews.LoggedIn)
          router.push('/home')
          // return redirect('/home')
        })
        .catch(err => {
          if (err?.response?.status == 401) errorMessage('كلمة المرور غير صحيحة')
          else errorMessage('خطا غير متوقع برجاء المحاولة فى وقت اخر')
        })
        .finally(() => {
          setLoading(false)
        })
    }
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
