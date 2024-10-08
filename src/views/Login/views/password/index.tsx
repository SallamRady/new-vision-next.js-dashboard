'use client'

// react mui
import { Button, Card, CardContent, CardHeader, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

// import packages
import { Api } from '@/Constants/Api'
import { signIn } from 'next-auth/react'
import { useContext, useState } from 'react'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/libs/axiosConfig'

function PasswordView() {
  // ** declare and define component state and variables
  const router = useRouter()
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { handleChangeView, globalId, selectedTenant, identifier } = useContext(AuthOperationsContext)

  // ** declare and define component helper methods
  /**
   * handle send password to login
   */
  async function handleSendPassword() {
    setLoading(true)

    try {
      // sign in
      console.log('PasswordXXX', {
        redirect: false,
        global_id: globalId,
        password,
        xtenant: selectedTenant?.id
      })
      let response = await signIn('credentials', {
        redirect: false,
        global_id: globalId,
        password,
        xtenant: selectedTenant?.id
      })
      if (response?.error) {
        if (response.status == 401) errorMessage('كلمة المرور غير صحيحة')
        else errorMessage('خطا غير متوقع برجاء المحاولة فى وقت اخر')
      } else if (response?.ok) {
        SuccessMessage('تم تسجيل الدخول بنجاح ستم تحويلك الى الصفحة الرئيسية')
        router.push('/home')
        setTimeout(() => {
          handleChangeView(LoginPageViews.LoggedIn)
        }, 1000)
      }
    } catch (error) {
      console.log('Error::', error)
      errorMessage('خطا غير متوقع برجاء المحاولة فى وقت اخر')
    } finally {
      setLoading(false)
    }
  }

  /**
   * handle forget password functionality
   */
  function handleForgetPassword() {
    setLoading(true)
    const body = { identifier }
    axiosInstance
      .post(Api(`identifier-check?forget_password=1`), body)
      .then(() => {
        handleChangeView(LoginPageViews.ForgetPassword)
      })
      .catch(() => {})
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
