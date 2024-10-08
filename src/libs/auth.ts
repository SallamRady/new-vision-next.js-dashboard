// Import packages
import axios from 'axios'
import CredentialsProvider from 'next-auth/providers/credentials'

// Import Types
import type { NextAuthOptions } from 'next-auth'
import { Api } from '@/Constants/Api'

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
          const url = Api(`login-with-different-methods`) //api``
          const body = {
            password: credentials?.password,
            global_id: credentials?.global_id,
            imei: '123876',
            device_token: 'iksadghqwei',
            device_type: 'android'
          }
          const headers = {
            'Content-Type': 'application/json',
            'X-Tenant': credentials?.xtenant
          }

          //send request.
          const response = await axios.post<ResType>(url, body, { headers })

          if (response.data?.token)
            return {
              global_id: credentials?.global_id,
              xtenantId: credentials?.xtenant,
              token: response.data?.token
            } as any
          else throw new Error('error in login with email & password')
        } catch (error: any) {
          //error
          throw new Error(error?.response?.data?.message)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return token
    },
    async session({ session }) {
      console.log('sourseSession', session)
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
