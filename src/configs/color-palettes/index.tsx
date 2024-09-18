import type { Theme } from '@mui/material'

import type { DeepPartial } from '@/types/deep-partial'

export type DeepPartialTheme = DeepPartial<{ light: Theme; dark: Theme }>

const createTheme = (palette: Theme['palette'], lightPaper: string, darkPaper: string): DeepPartialTheme => ({
  light: {
    palette: {
      ...palette,
      background: {
        ...palette.background,
        default: palette.background?.default || '#222',
        paper: lightPaper
      }
    }
  },
  dark: {
    palette: {
      ...palette,
      background: {
        ...palette.background,
        default: palette.background?.default || '#222',
        paper: darkPaper
      }
    }
  }
})

export const colorPalettes: DeepPartialTheme[] = [
  createTheme(
    {
      primary: {
        main: '#A0D2DB',
        light: '#B3E2E6',
        dark: '#89C4CE',
        contrastText: '#0A0A0A'
      },
      secondary: {
        main: '#F28F3B',
        light: '#F5A860',
        dark: '#D3782C',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#000000'
      }
    } as Theme['palette'],
    '#F7F6F4',
    '#22223B'
  ),
  createTheme(
    {
      primary: {
        main: '#FF595E',
        light: '#FF7479',
        dark: '#E04448',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#1982C4',
        light: '#3C9CE6',
        dark: '#1461A0',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#000000'
      }
    } as Theme['palette'],
    '#F5F5F5',
    '#2F3E46'
  ),
  createTheme(
    {
      primary: {
        main: '#8D99AE',
        light: '#A4B1C1',
        dark: '#6F7A8A',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#EF233C',
        light: '#F55A63',
        dark: '#C21D30',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#000000'
      }
    } as Theme['palette'],
    '#EDF2F4',
    '#0B0C10'
  ),
  createTheme(
    {
      primary: {
        main: '#F72585',
        light: '#FA5BA4',
        dark: '#C11666',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#3A0CA3',
        light: '#5C35C8',
        dark: '#2B0781',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#2D1954'
      }
    } as Theme['palette'],
    '#F1FAEE',
    '#1B1B2F'
  ),
  createTheme(
    {
      primary: {
        main: '#4361EE',
        light: '#6186F3',
        dark: '#3148BB',
        contrastText: '#FFFFFF'
      },
      secondary: {
        main: '#F48C06',
        light: '#F6A03A',
        dark: '#C37105',
        contrastText: '#000000'
      },
      background: {
        default: '#000000'
      }
    } as Theme['palette'],
    '#FAF3E0',
    '#121212'
  ),
  createTheme(
    {
      primary: {
        main: '#06D6A0',
        light: '#42E2B8',
        dark: '#04B382',
        contrastText: '#000000'
      },
      secondary: {
        main: '#118AB2',
        light: '#43A3C1',
        dark: '#0F7695',
        contrastText: '#FFFFFF'
      },
      background: {
        default: '#000000'
      }
    } as Theme['palette'],
    '#E9FFDB',
    '#1B262C'
  )
]
