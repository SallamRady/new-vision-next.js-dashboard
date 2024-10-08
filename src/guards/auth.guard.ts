// types
import type { FC } from 'react'

import { redirect } from 'next/navigation'

// import packages
import axios from 'axios'
import { Api } from '@/Constants/Api'
import { authOptions } from '@/libs/auth/auth'
import { getServerSession } from 'next-auth/next'
import { getAuthHeaders } from '@/libs/headers/headerServices'
import { getAuthSession } from '@/libs/auth/getAuthSession'

export async function requireAuth() {
  const headers = await getAuthHeaders()

  if (!headers.Authorization) {
    redirect('/auth/login')
  }

  console.log('headers --x-x-x-x--', headers)

  try {
    const data = await axios.get(Api(`employee/home`), { headers })
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
