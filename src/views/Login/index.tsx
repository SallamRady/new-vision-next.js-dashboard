// Assets Imports

// React Imports
import { type ImgHTMLAttributes } from 'react'

// Next Imports

// Type Imports
import { Container, Stack, Typography } from '@mui/material'

import newVisionLogo from '@assets/images/logos/new-vision.png'

import type { Mode } from '@core/types'

// Component Imports

// Hook Imports
import { AuthOperationsContextProvider } from './context'
import { ParticlesComponent } from '@/components/particles'
import RoundedBackgroundContainer from '@/components/rounded-background-container'
import LoginViewsIndex from './views'

const LogoImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} style={{ height: 82, ...props.style }} />
)

const LoginV1 = ({}: { mode: Mode }) => {
  return (
    <AuthOperationsContextProvider>
      <div className='flex justify-center items-center min-bs-[100dvh] is-full relative p-6'>
        {/* Particles Background */}
        <div className='absolute w-full h-full top-0 left-0' style={{ zIndex: -2 }}>
          <ParticlesComponent />
        </div>
        {/* RoundedBackgroundContainer Top */}
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
        {/* Page Content */}
        <LoginViewsIndex />
        {/* RoundedBackgroundContainer Bottom */}
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
    </AuthOperationsContextProvider>
  )
}

export default LoginV1
