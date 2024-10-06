'use client'

import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material'

import axios from 'axios'
import { Api } from '@/Constants/Api'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { retriveFromLocalStorage, StoreInLocalStorage } from '@/utils/local.storage'
import { errorMessage } from '@/utils/notificationsMessages'
import { AuthOperationsContext, LoginPageViews } from '../../context'
import axiosInstance from '@/libs/axiosConfig'

function SetPasswordView() {
  // ** declare and define component state and variables
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({ password: false, confirmPassword: false })
  const [errorMessage, setErrorMessage] = useState({ password: '', confirmPassword: '' })
  const { handleChangeView, globalId, selectedTenant } = useContext(AuthOperationsContext)

  // ** handle side effects

  // ** declare and define component helper methods
  function handleSetPassword() {
    if (!(error.password == false && error.confirmPassword == false)) return //invalid\

    console.log('retriveFromLocalStorage(`xTenentId`),', retriveFromLocalStorage(`xTenentId`))
    const body = {
      global_id: retriveFromLocalStorage(`globalId`),
      password: password,
      password_confirmation: confirmPassword
    }
    setLoading(true)
    axiosInstance
      .post(Api(`set-pass`), body, {
        headers: {
          'X-Tenant': retriveFromLocalStorage(`xTenentId`)
        }
      })
      .then(response => {
        handleChangeView(LoginPageViews.MAIN_PAGE)
      })
      .catch(err => {})
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
    } else if (!new RegExp('[!@#$%^&*(),.?":{}|<>]').test(str)) {
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
              handleSetPassword()
            }}
            className='flex flex-col gap-5'
          >
            {/* password */}
            <TextField
              autoFocus
              fullWidth
              type='password'
              error={error.password}
              onChange={e => {
                handlePasswordChange(e.target.value)
              }}
              helperText={
                <Typography color={'error'} variant='body2'>
                  {errorMessage.password}
                </Typography>
              }
              label='أدخل كلمة المرور'
              disabled={loading}
            />

            {/* confirm password */}
            <TextField
              fullWidth
              type='password'
              error={error.confirmPassword}
              onChange={e => {
                handleChangeConfirmPassword(e.target.value)
              }}
              helperText={
                <Typography color={'error'} variant='body2'>
                  {errorMessage.confirmPassword}
                </Typography>
              }
              label='تاكيد كلمة المرور'
              disabled={loading}
            />

            <Button
              fullWidth
              variant='contained'
              type='submit'
              disabled={!(error.password == false && error.confirmPassword == false) || loading}
            >
              {!loading ? 'Set Password' : 'Loading...'}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default SetPasswordView
