'use server'

import { authOptions } from './auth'
import { getServerSession } from 'next-auth'

export async function getAuthSession() {
  const session = await getServerSession(authOptions)

  return session
}
