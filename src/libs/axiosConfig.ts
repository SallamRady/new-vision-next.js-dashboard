import { retriveFromLocalStorage } from '@/utils/local.storage'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { getAuthSession } from './auth/getAuthSession'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  async config => {
    const session = await getAuthSession()

    const xTenantId = retriveFromLocalStorage('xTenentId')

    if (session?.accessToken) {
      config.headers['Authorization'] = `Bearer ${session?.accessToken}`
      config.headers['X-Tenant'] = `${xTenantId}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
