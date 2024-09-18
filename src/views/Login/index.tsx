'use client'

// Assets Imports

// React Imports
import { useMemo, useState, type ImgHTMLAttributes, type ReactElement } from 'react'

// Next Imports

// Type Imports
import { Container, Stack, Typography } from '@mui/material'

import newVisionLogo from '@assets/images/logos/new-vision.png'

import type { Mode } from '@core/types'

// Component Imports

// Hook Imports
import { ParticlesComponent } from '@/components/particles'
import LoginView from './views/login'
import OtpView from './views/otp'
import RoundedBackgroundContainer from '@/components/rounded-background-container'

const LogoImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} style={{ height: 82, ...props.style }} />
)

export enum LoginPageViews {
  login,
  otp
}

const LoginV1 = ({}: { mode: Mode }) => {
  const [view, setView] = useState<LoginPageViews>(LoginPageViews.login)

  const viewComponent: ReactElement = useMemo(() => {
    switch (view) {
      case LoginPageViews.login:
        return <LoginView next={() => setView(LoginPageViews.otp)} />
      case LoginPageViews.otp:
        return <OtpView next={() => setView(LoginPageViews.login)} />
    }
  }, [view])

  return (
    <div className='flex justify-center items-center min-bs-[100dvh] is-full relative p-6'>
      <div className='absolute w-full h-full top-0 left-0' style={{ zIndex: -2 }}>
        <ParticlesComponent />
      </div>
      <div className='absolute top-0 w-full' style={{ height: 250 }}>
        <RoundedBackgroundContainer orientation='top'>
          <Container maxWidth='xl' sx={{ py: 6 }}>
            <Stack direction='column' gap={2} alignItems='center'>
              <div>
                <LogoImage src={newVisionLogo.src} />
              </div>
              <Typography variant='h3'>لوحة التحكم</Typography>
            </Stack>
          </Container>
        </RoundedBackgroundContainer>
      </div>
      {viewComponent}
      <div className='absolute bottom-0 w-full' style={{ height: 250 }}>
        <RoundedBackgroundContainer orientation='bottom'>
          <Stack direction='row' alignItems={'center'} justifyContent={'center'} spacing={2} mb={2}>
            <Typography variant='h5' textAlign='center' color='#ffffff'>
              جميع الحقوق البرمجية محفوظة لشركة نيو فيجن التقنية .
            </Typography>
            <img src={newVisionLogo.src} style={{ height: '2em' }} alt='' />
          </Stack>
        </RoundedBackgroundContainer>
      </div>
    </div>
  )
}

export type WithNextStepProps = {
  next: () => void
}

export default LoginV1
