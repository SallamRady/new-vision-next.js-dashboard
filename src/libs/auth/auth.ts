// Import packages
import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'

// Import Types
import type { NextAuthOptions } from 'next-auth'

import { api } from '@/Constants/Api'

type ResType = {
  token: string
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        password: { label: 'Password', type: 'password' },
        xtenant: { label: 'xtenant', type: 'xtenant' },
        global_id: { label: 'global_id', type: 'global_id' }
      },
      async authorize(credentials) {
        try {
          // declare helper variables
          const url = api`login-with-different-methods`

          const body = {
            password: credentials?.password,
            global_id: credentials?.global_id
          }

          const headers = {
            'Content-Type': 'application/json',
            'X-Tenant': credentials?.xtenant
          }

          //send request.
          const response = await axios.post<ResType>(url, body, { headers })

          if (response.data?.token) {
            return {
              global_id: credentials?.global_id,
              xtenantId: credentials?.xtenant,
              accessToken: response.data?.token
            } as any
          } else throw new Error('error in login with email & password')
        } catch (error: any) {
          //error
          console.log('error1101', error)
          throw new Error(error?.response?.data?.message)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.global_id = user.global_id
        token.xtenantId = user.xtenantId
      }

      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.global_id = token.global_id as string
      session.xtenantId = token.xtenantId as string

      return session
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/login'
  }
}
