// types
import type { FC } from 'react'

import { redirect } from 'next/navigation'

// import packages
import axios from 'axios'
import { api } from '@/Constants/Api'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { getAuthSession } from '@/libs/auth/getAuthSession'
import NotAuthorized from '@/views/NotAuthorized'

async function isAuthorized(headers: Record<string, string>) {
  const session = await getAuthSession()

  if (process.env.NODE_ENV === 'development') return

  return await axios.post(api`authorized`, undefined, {
    headers: {
      ...headers,
      'X-Tenant': session?.xtenantId
    }
  })
}
// Higher Order Function for auth check
export function withAuth<T extends FC<any>>(ServerComponent: T) {
  // Returns a new function component
  return async function AuthenticatedComponent(props: any) {
    const headers = await getAuthHeaders()

    if (!headers.Authorization) redirect('/auth/login')

    try {
      await isAuthorized(headers)

      return <ServerComponent {...props} />
    } catch (error) {
      return <NotAuthorized />
    }
  }
}

// Higher Order Function for auth check
export function withNoAuth<T extends FC<any>>(ServerComponent: T) {
  // Returns a new function component
  return async function AuthenticatedComponent(props: any) {
    const headers = await getAuthHeaders()

    if (!headers.Authorization) return <ServerComponent {...props} />
    else {
      try {
        await isAuthorized(headers)

        redirect('/home')
      } catch (error) {
        return <NotAuthorized />
      }
    }
  }
}

export async function requireAuth() {
  const headers = await getAuthHeaders()

  if (!headers.Authorization) {
    redirect('/auth/login')
  }

  try {
    await isAuthorized(headers)
  } catch (error) {
    redirect('/auth/logout')
  }
}

export async function requireNoAuth() {
  const session = await getAuthSession()

  if (session) {
    redirect('/home')
  }
}
