'use client'

import { Button, Card, CardContent, CardHeader, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import axios from 'axios'
import { Api } from '@/Constants/Api'
import { useContext, useEffect, useState } from 'react'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { StoreInLocalStorage } from '@/utils/local.storage'
import { redirect, useRouter } from 'next/navigation'
import axiosInstance from '@/libs/axiosConfig'

function PasswordView() {
  // ** declare and define component state and variables
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { handleChangeView, globalId, selectedTenant, identifier } = useContext(AuthOperationsContext)

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
          router.push('/home')
          setTimeout(() => {
            handleChangeView(LoginPageViews.LoggedIn)
          }, 500)
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

  function handleForgetPassword() {
    setLoading(true)
    const body = { identifier }
    axiosInstance
      .post(Api(`identifier-check?forget_password=1`), body)
      .then(response => {
        handleChangeView(LoginPageViews.ForgetPassword)
      })
      .catch(err => {})
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
          <Typography variant='body2' fontWeight={600} fontSize={26} textAlign={'center'}>
            ادخل كلمة المرور
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
              type={showPassword ? 'text' : 'password'}
              error={error}
              onChange={e => {
                if (e.target.value.length == 0) setError(true)
                else setError(false)

                setPassword(e.target.value)
              }}
              helperText={error ? 'كلمة المرور مطلوبة' : ''}
              label='أدخل كلمة المرور'
              size='small'
              disabled={loading}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => {
                        setShowPassword(prev => !prev)
                      }}
                      edge='end'
                    >
                      {!showPassword ? <i className={`ri-eye-line`}></i> : <i className={`ri-eye-off-line`}></i>}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button fullWidth variant='contained' type='submit' disabled={password.length == 0 || loading}>
              {loading ? 'جاري التنفيذ..' : 'دخول'}
            </Button>
          </form>
          <Typography
            variant='body2'
            fontWeight={400}
            fontSize={18}
            sx={{ cursor: 'pointer' }}
            onClick={handleForgetPassword}
          >
            هل نسيت كلمة المرور؟{' '}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
}

export default PasswordView
