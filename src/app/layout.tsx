// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import { PaletteContextProvider } from '@/contexts/paletteContext'
import { ReduxProvider } from '@/store/redux-provider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const metadata = {
  title: 'New Vision - Software House',
  description: 'Dashboard for new vision software house company'
}

const RootLayout = ({ children }: ChildrenType) => {
  // Vars
  const direction = 'rtl'

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
