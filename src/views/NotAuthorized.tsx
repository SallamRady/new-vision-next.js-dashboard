'use client'

// Next Imports
import Link from 'next/link'

// MUI Imports
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

// Type Imports
import { signOut } from 'next-auth/react'

const NotAuthorized = () => {
  // Vars
  const darkImg = '/images/pages/misc-mask-4-dark.png'

  // Hooks
  // const miscBackground = useImageVariant(mode, lightImg, darkImg)

  return (
    <div className='flex items-center justify-center min-bs-[100dvh] relative p-6 overflow-x-hidden'>
      <div className='flex items-center flex-col text-center gap-10'>
        <div className='flex flex-col gap-2 is-[90vw] sm:is-[unset]'>
          <Typography className='text-8xl font-medium' color='text.primary'>
            401
          </Typography>
          <Typography variant='h4'>أنت غير مصرح بالدخول! 🔐</Typography>
          <Typography>ليس لديك إذن للوصول إلى هذه الصفحة. عُد إلى الصفحة الرئيسية!</Typography>
        </div>
        <img
          alt='error-illustration'
          src='/images/illustrations/characters/6.png'
          className='object-cover bs-[400px] md:bs-[450px] lg:bs-[500px]'
        />
        <div className='flex gap-2'>
          <Button href={'/home'} component={Link} variant='contained'>
            العودة إلى الصفحة الرئيسية
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              signOut()
            }}
          >
            تسجيل الخروج
          </Button>
        </div>
      </div>
      <img src={darkImg} className='absolute bottom-0 z-[-1] is-full max-md:hidden' />
    </div>
  )
}

export default NotAuthorized
