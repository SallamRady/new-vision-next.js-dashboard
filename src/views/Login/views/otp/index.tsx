'use client'

import { useContext, useState } from 'react'
import './styles.scss'

import { Button, Container, Link, Stack, Typography } from '@mui/material'
import OtpInput from 'react-otp-input'
import Countdown from 'react-countdown'
import { AuthOperationsContext, LoginPageViews } from '../../context'

function OtpView() {
  const [otp, setOtp] = useState('')
  const { handleChangeView } = useContext(AuthOperationsContext)

  return (
    <Container maxWidth='xs'>
      <form
        noValidate
        autoComplete='off'
        onSubmit={e => {
          e.preventDefault()
          handleChangeView(LoginPageViews.MAIN_PAGE)
        }}
        className='flex flex-col gap-5'
      >
        <Stack>
          <Stack className='login-otp otp-input' alignItems='center'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              containerStyle={{ gap: 16 }}
              renderInput={props => <input {...props} className={props.value ? 'has-content' : ''} />}
            />
          </Stack>
          <Typography variant='body2' color='error'></Typography>
        </Stack>

        <Button fullWidth variant='contained' type='submit'>
          الدخول
        </Button>

        <div className='flex flex-row items-center justify-center gap-1'>
          <Countdown date={Date.now() + 30 * 1000} renderer={({ seconds }) => seconds} />
          <i className='ri-timer-2-line text-[22px]' />
        </div>
        <Typography textAlign='center'>
          لم يصلك رمز التحقق؟ <Link color={'text.primary'}>اعادة الارسال</Link>
        </Typography>
      </form>
    </Container>
  )
}

export default OtpView
