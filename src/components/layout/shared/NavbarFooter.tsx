import Image from 'next/image'

import { Stack } from '@mui/material'

import newVisionLogo from '@assets/images/logos/new-vision.png'

export default function NavbarFooter() {
  return (
    <Stack
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        zIndex: 10
      }}
    >
      <Image src={newVisionLogo.src} width={50} height={50} alt='new vision logo' />
    </Stack>
  )
}
