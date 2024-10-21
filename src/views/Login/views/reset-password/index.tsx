'use client'

import { useContext, useState } from 'react'

import { Button, Card, CardContent, CardHeader, IconButton, InputAdornment, TextField, Typography } from '@mui/material'

import { api } from '@/Constants/Api'
import axiosInstance from '@/libs/axiosConfig'
import { retriveFromLocalStorage } from '@/utils/local.storage'
import { SuccessMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'

function ResetPassword() {
  // ** declare and define component state and variables
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState({ password: false, confirmPassword: false })
  const [errorMessage, setErrorMessage] = useState({ password: '', confirmPassword: '' })
  const { handleChangeView } = useContext(AuthOperationsContext)

  // ** handle side effects

  // ** declare and define component helper methods
  function handleReSetPassword() {
    if (!(error.password == false && error.confirmPassword == false)) return //invalid

    //prepare body of form
    const body = {
      global_id: retriveFromLocalStorage(`globalId`),
      password: password,
      password_confirmation: confirmPassword
    }

    //start sending request
    setLoading(true)
    axiosInstance
      .post(api`set-pass`, body, {
        headers: {
          'X-Tenant': retriveFromLocalStorage(`xTenentId`)
        }
      })
      .then(() => {
        SuccessMessage('تم تغير حفظ كلمة المرور بنجاح, سيتم تحويلك لتجسيل الدخول الأن')
        handleChangeView(LoginPageViews.MAIN_PAGE)
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false)
      })
  }

  function handlePasswordChange(str: string) {
    if (str.length == 0) setErrorMessage(err => ({ ...err, password: 'كلمة المرور مطلوبة' }))
    else if (!new RegExp('[A-Z]').test(str)) {
      //capital
      setError(prev => ({ ...prev, password: true }))
      setErrorMessage(err => ({ ...err, password: 'كلمة المرور يجب ان تحتوي علي حرف كابتل' }))
    } else if (!new RegExp('[a-z]').test(str)) {
      //small
      setError(prev => ({ ...prev, password: true }))
      setErrorMessage(err => ({ ...err, password: 'كلمة المرور يجب ان تحتوي علي حرف سمول' }))
    } else if (!new RegExp('[\\d]').test(str)) {
      //number
      setError(prev => ({ ...prev, password: true }))
      setErrorMessage(err => ({ ...err, password: 'كلمة المرور يجب ان تحتوي علي رقم' }))
    } else if (!new RegExp('[!@#$%^&*(),.?":;{}|<>]').test(str)) {
      //special char
      setError(prev => ({ ...prev, password: true }))
      setErrorMessage(err => ({ ...err, password: 'كلمة المرور يجب تحتوي علي رمز ' }))
    } else if (str.length < 8) {
      //length
      setError(prev => ({ ...prev, password: true }))
      setErrorMessage(err => ({ ...err, password: 'كلمة المرور يجب لا يقل طولها عن 8 أحرف' }))
    } else {
      //valid
      setError(prev => ({ ...prev, password: false }))
      setErrorMessage(prev => ({ ...prev, password: '' }))
    }

    setPassword(str)
  }

  function handleChangeConfirmPassword(str: string) {
    if (str !== password) {
      setError(prev => ({ ...prev, confirmPassword: true }))
      setErrorMessage(prev => ({ ...prev, confirmPassword: 'كلمتي المرور و التاكيد غير متطابقتين' }))
    } else if (str.length === 0) {
      setError(prev => ({ ...prev, confirmPassword: true }))
      setErrorMessage(prev => ({ ...prev, confirmPassword: 'كلمة التاكيد مطلوبة' }))
    } else {
      setError(prev => ({ ...prev, confirmPassword: false }))
      setErrorMessage(prev => ({ ...prev, confirmPassword: '' }))
    }

    setConfirmPassword(str)
  }

  // ** component ui
  return (
    <Card className='flex flex-col '>
      {/* card header */}
      <CardHeader
        title={
          <Typography variant='body2' fontWeight={600} fontSize={26} textAlign={'center'}>
            اعادة تعيين كلمة المرور
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
              handleReSetPassword()
            }}
            className='flex flex-col gap-5'
          >
            <div className='flex flex-col gap-4'>
              {/* password */}
              <TextField
                autoFocus
                fullWidth
                size='small'
                type={showPassword ? 'text' : 'password'}
                error={error.password}
                onChange={e => {
                  handlePasswordChange(e.target.value)
                }}
                helperText={
                  <Typography color={'error'} variant='body2'>
                    {errorMessage.password}
                  </Typography>
                }
                label='كلمة المرور الجديدة'
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
                onCopy={e => {
                  e.preventDefault()
                }}
                onPaste={e => {
                  e.preventDefault()
                }}
              />

              {/* confirm password */}
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                size='small'
                error={error.confirmPassword}
                onChange={e => {
                  handleChangeConfirmPassword(e.target.value)
                }}
                helperText={
                  <Typography color={'error'} variant='body2'>
                    {errorMessage.confirmPassword}
                  </Typography>
                }
                label='تأكيد كلمة المرور الجديدة'
                disabled={loading}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => {
                          setShowConfirmPassword(prev => !prev)
                        }}
                        edge='end'
                      >
                        {!showConfirmPassword ? (
                          <i className={`ri-eye-line`}></i>
                        ) : (
                          <i className={`ri-eye-off-line`}></i>
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                onCopy={e => {
                  e.preventDefault()
                }}
                onPaste={e => {
                  e.preventDefault()
                }}
              />

              <Typography variant='body2' fontSize={15}>
                أن تكون كلمة المرور بطول 8 أحرف على الأقل، حرف كبير واحد على الأقل،
                <br /> استخدام رمز خاص واحد على الأقل.
              </Typography>
            </div>

            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={!(error.password == false && error.confirmPassword == false) || loading}
            >
              {!loading ? 'تأكيد' : 'جاري الحفظ'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default ResetPassword
