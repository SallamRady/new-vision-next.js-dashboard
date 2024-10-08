import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    global_id?: string
    xtenantId?: string
  }

  interface User {
    accessToken: string
    global_id: string
    xtenantId: string
  }
}
