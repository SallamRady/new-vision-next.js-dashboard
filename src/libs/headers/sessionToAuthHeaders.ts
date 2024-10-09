import { AuthHeaders } from '@/types/AuthHeaders'
import { Session } from 'next-auth'

export const sessionToAuthHeaders = (session: Session | undefined | null, headers?: AuthHeaders): AuthHeaders => {
  if (!session?.accessToken || !session.xtenantId) return { ...headers }

  return { Authorization: `Bearer ${session.accessToken}`, 'X-Tenant': session?.xtenantId, ...headers }
}
