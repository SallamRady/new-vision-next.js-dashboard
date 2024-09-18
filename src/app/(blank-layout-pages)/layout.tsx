// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'
import CustomCustomizer from '@/components/custom-customizer'

type Props = ChildrenType

const Layout = ({ children }: Props) => {
  // Vars
  const direction = 'rtl'
  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <CustomCustomizer />
      <BlankLayout systemMode={systemMode}>{children}</BlankLayout>
    </Providers>
  )
}

export default Layout
