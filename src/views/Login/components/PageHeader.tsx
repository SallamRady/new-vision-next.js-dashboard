'use client'
import { ImgHTMLAttributes, useContext } from 'react'
import { Stack, Typography } from '@mui/material'
import { AuthOperationsContext } from '../context'

const LogoImage = (props: ImgHTMLAttributes<HTMLImageElement>) => (
  <img {...props} style={{ height: 82, ...props.style }} />
)

export default function PageHeader() {
  const { selectedTenant } = useContext(AuthOperationsContext)

  return (
    <Stack direction='column' gap={2} minHeight={'150px'} alignItems='center' justifyContent={'center'}>
      {Boolean(selectedTenant) && (
        <div>
          <LogoImage src={selectedTenant?.media?.[0]?.original_url ?? ''} />
        </div>
      )}
      <Typography variant='h3' fontWeight={700} fontSize={22}>
        لوحة التحكم
      </Typography>
    </Stack>
  )
}
