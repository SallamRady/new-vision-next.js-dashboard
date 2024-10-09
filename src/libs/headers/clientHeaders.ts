'use client'

import { getSession } from 'next-auth/react'

import type { AuthHeaders } from '@/types/AuthHeaders'
import { sessionToAuthHeaders } from './sessionToAuthHeaders'

export const getClientAuthHeaders = async (headers?: AuthHeaders) => {
  const session = await getSession()

  return sessionToAuthHeaders(session, headers)
}
