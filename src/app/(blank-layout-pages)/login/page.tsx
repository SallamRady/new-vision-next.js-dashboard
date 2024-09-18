// Next Imports
import type { Metadata } from 'next'

// Component Imports
import Login from '@/views/Login'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

export const metadata: Metadata = {
  title: 'تسجيل ادخول',
  description: 'تسجيل الدخول اللوحة التحكم الخاصة بشركة New Vision '
}

const LoginPage = () => {
  // Vars
  const mode = getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
