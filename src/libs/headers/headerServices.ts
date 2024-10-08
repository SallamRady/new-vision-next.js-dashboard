'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/auth'

export const getAuthHeaders = async (headers?: Record<string, string>): Promise<Record<string, string>> => {
  const data = await getServerSession(authOptions)

  if (!data?.accessToken) return { ...headers }

  return { ...headers, Authorization: `Bearer ${data.accessToken}` }
}
