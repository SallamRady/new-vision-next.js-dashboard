// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getServerSession } from 'next-auth'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.scss'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { PaletteContextProvider } from '@/contexts/paletteContext'
import { ReduxProvider } from '@/store/redux-provider'

import { authOptions } from '@/libs/auth/auth'

export const metadata = {
  title: 'New Vision - Software House',
  description: 'Dashboard for new vision software house company'
}

const RootLayout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'rtl'

  await getServerSession(authOptions)

  return (
    <html id='__next' lang='en' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col overflow-x-hidden'>
        <PaletteContextProvider>
          <ReduxProvider>{children}</ReduxProvider>
          <ToastContainer position='bottom-right' />
        </PaletteContextProvider>
      </body>
    </html>
  )
}

export default RootLayout
