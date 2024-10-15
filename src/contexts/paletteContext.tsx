'use client'

import type { ReactNode } from 'react'
import { createContext, useState, useEffect, useMemo } from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { DeepPartialTheme } from '@/configs/color-palettes'
import { colorPalettes } from '@/configs/color-palettes'
import { SessionProvider } from 'next-auth/react'

export const paletteContext = createContext<PaletteContext>({
  index: 0,
  allThemes: colorPalettes,
  currentTheme: colorPalettes[0],
  setIndex() {}
})

export type PaletteContext = {
  index: number
  allThemes: DeepPartialTheme[]
  currentTheme: DeepPartialTheme
  setIndex: (index: number) => void
}

export const PaletteContextProvider = ({ children }: { children: ReactNode }) => {
  const [index, setIndex] = useState<number | undefined>(undefined) // Initialize with default value
  const currentTheme = useMemo(() => colorPalettes[index || 0], [index])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Read from localStorage on mount and set the index
      const storedIndex = localStorage.getItem('paletteIndex')

      setIndex(Number(storedIndex) || 0)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (index === undefined) {
        // Read from localStorage on mount and set the index
        const storedIndex = Number(localStorage.getItem('paletteIndex')) || 0

        setIndex(Number(storedIndex) || 0)
        localStorage.setItem('paletteIndex', `${storedIndex}`)
      } else {
        localStorage.setItem('paletteIndex', `${index}`)
      }
    }
  }, [index])

  return (
    <paletteContext.Provider value={{ allThemes: colorPalettes, currentTheme, index: index || 0, setIndex }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SessionProvider>{children}</SessionProvider>
      </LocalizationProvider>
    </paletteContext.Provider>
  )
}
