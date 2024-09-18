/*
 * We recommend using the merged theme if you want to override our core theme.
 * This means you can use our core theme and override it with your own customizations.
 * Write your overrides in the userTheme object in this file.
 * The userTheme object is merged with the coreTheme object within this file.
 * Export this file and import it in the `@components/theme/index.tsx` file to use the merged theme.
 */

// MUI Imports
import { deepmerge } from '@mui/utils'
import type { Theme } from '@mui/material/styles'

// Type Imports
import type { Settings } from '@/@core/contexts/settingsContext'
import type { SystemMode } from '@core/types'

// Core Theme Imports
import coreTheme from '@core/theme'

const mergedTheme = (settings: Settings, mode: SystemMode, direction: Theme['direction']) => {
  // Vars
  const userTheme = {
    colorSchemes: {
      light: {
        palette: {
          primary: { main: '#F42588', contrastText: '#FFFFFF' },
          secondary: { main: '#43378C', contrastText: '#FFFFFF' },
          background: {
            default: settings.skin === 'bordered' ? '#2D1954 ' : '#2D1954',
            paper: '#FFFFFF'
          }
        }
      },
      dark: {
        palette: {
          primary: { main: '#F42588', contrastText: '#FFFFFF' },
          secondary: { main: '#43378C', contrastText: '#FFFFFF' },
          background: {
            default: settings.skin === 'bordered' ? '#2D1954 ' : '#2D1954',
            paper: '#301C56'
          }
        }
      }
    }
  } as Theme

  return deepmerge(coreTheme(settings, mode, direction), userTheme)
}

export default mergedTheme
