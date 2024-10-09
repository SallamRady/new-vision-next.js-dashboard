'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/auth'
import { sessionToAuthHeaders } from './sessionToAuthHeaders'

export const getAuthHeaders = async (headers?: Record<string, string>): Promise<Record<string, string>> => {
  const data = await getServerSession(authOptions)

  return sessionToAuthHeaders(data, headers)
}
