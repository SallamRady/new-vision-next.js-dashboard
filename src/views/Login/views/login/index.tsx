import { Button, Card, CardContent, CardHeader, Divider, TextField, Typography } from '@mui/material'

import type { WithNextStepProps } from '../..'

function LoginView({ next }: WithNextStepProps) {
  return (
    <Card className='flex flex-col sm:is-[460px]'>
      <CardHeader title={<Typography variant='h4'>تسجيل الدخول</Typography>}></CardHeader>
      <CardContent className='p-6 sm:!p-12'>
        <div className='flex flex-col gap-5'>
          <form
            noValidate
            autoComplete='off'
            onSubmit={e => {
              e.preventDefault()
              next()
            }}
            className='flex flex-col gap-5'
          >
            <TextField autoFocus fullWidth label='ادخل رقم الجوال / البريد الالكتروني' />

            <Button fullWidth variant='contained' type='submit'>
              ارسال رمز التحقق
            </Button>

            <Divider className='gap-3 text-textPrimary'>أو</Divider>
            <Button fullWidth variant='contained' type='submit' color='secondary'>
              تسجيل الدخول عن طريق بوابة نفاذ
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginView
