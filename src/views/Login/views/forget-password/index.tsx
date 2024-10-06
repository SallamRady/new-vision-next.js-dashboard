'use client'

import { Button, Card, CardContent, CardHeader, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import axios from 'axios'
import { Api } from '@/Constants/Api'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { StoreInLocalStorage } from '@/utils/local.storage'

function ForgetPassword() {
  // ** declare and define component state and variables
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [timeLeft, setTimeLeft] = useState(900)
  const [passwordExpired, setPasswordExpired] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { handleChangeView, globalId, selectedTenant, identifier } = useContext(AuthOperationsContext)

  // ** handle side effects
  useEffect(() => {
    // If the timer reaches 0, stop the timer
    if (timeLeft <= 0) {
      setPasswordExpired(true)
      return
    }

    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1)
    }, 1000)

    return () => {
      clearInterval(timerInterval)
    }
  }, [timeLeft])

  // ** declare and define component helper methods
  function handleSendPassword() {
    handleChangeView(LoginPageViews.ResetPassword)
    return

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
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
  }

  // ** component ui
  return (
    <Card className='flex flex-col sm:is-[460px]'>
      {/* card header */}
      <CardHeader
        title={
          <Typography variant='body2' fontWeight={600} fontSize={26} textAlign={'center'}>
            نسيت كلمة المرور
          </Typography>
        }
      ></CardHeader>
      {/* card content */}
      <CardContent className='p-6 sm:!p-12'>
        <div className='flex flex-col gap-3'>
          <Typography variant='body2' fontSize={16}>
            ادخل كلمة المرور المؤقتة المرسلة على البريد الالكتروني
            <br />
            <span className='font-bold'>{identifier}</span>
          </Typography>

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
              helperText={error ? 'كلمة المرور المؤقتة مطلوبة' : ''}
              label='كلمة المرور المؤقتة'
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

            <Typography variant='body2' fontWeight={500} fontSize={14}>
              تنتهي صلاحية كلمة المرور بعد {formatTime(timeLeft)} دقيقة
            </Typography>

            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={password.length == 0 || loading || passwordExpired}
            >
              {loading ? 'جاري التنفيذ..' : 'تأكيد'}
            </Button>

            <Button
              fullWidth
              variant='text'
              type='button'
              disabled={loading}
              sx={{ textDecoration: 'underline', fontSize: 18, cursor: 'pointer' }}
            >
              اعادة ارسال
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default ForgetPassword
