import type { Session } from 'next-auth'

import type { AuthHeaders } from '@/types/AuthHeaders'

export const sessionToAuthHeaders = (session: Session | undefined | null, headers?: AuthHeaders): AuthHeaders => {
  if (!session?.accessToken || !session.xtenantId) return { ...headers }

  return { Authorization: `Bearer ${session.accessToken}`, 'X-Tenant': session?.xtenantId, ...headers }
}
