'use client'
import { useContext, useMemo } from 'react'
import { AuthOperationsContext, LoginPageViews } from '../context'
import LoginView from './login'
import ChooseCorrentTenant from './choose-tenant'
import OtpView from './otp'
import PasswordView from './password'
import SetPasswordView from './set-password'

export default function LoginViewsIndex() {
  // ** declare and define component state and variables
  const { view, handleChangeView } = useContext(AuthOperationsContext)

  const viewComponent = useMemo(() => {
    switch (view) {
      case LoginPageViews.MAIN_PAGE:
        return <LoginView />
      case LoginPageViews.Multi_TENANTS:
        return <ChooseCorrentTenant />
      case LoginPageViews.OTP:
        return <OtpView />
      case LoginPageViews.PASSWORD:
        return <PasswordView />
      case LoginPageViews.SetPassword:
        return <SetPasswordView />
    }
  }, [view])

  return <>{viewComponent}</>
}
