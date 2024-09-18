'use client'

import './style.scss'

import type { ReactNode } from 'react'

import { Box, darken } from '@mui/material'

function RoundedBackgroundContainer({ orientation, children }: Props) {
  return (
    <div
      className={`w-full h-full relative flex flex-col items-center overflow-hidden ${orientation === 'top' ? 'justify-start' : 'justify-end'}`}
      style={{ zIndex: -1 }}
    >
      <Box
        sx={({ palette }) => ({
          '--mui-palette-background-default': darken(palette.background.default, 0.5),
          width: '200vw',
          height: '90vw',
          position: 'absolute',
          pointerEvents: 'none',
          bgcolor: 'background.paper',
          borderRadius: '100%',
          zIndex: 1,
          [orientation === 'top' ? 'bottom' : 'top']: 0
        })}
        className='rounded-background-box'
      ></Box>
      <div style={{ position: 'relative', zIndex: 4, width: '100%' }}>{children}</div>
    </div>
  )
}

type Props = {
  orientation: 'top' | 'bottom'
  children?: ReactNode
}

export default RoundedBackgroundContainer
