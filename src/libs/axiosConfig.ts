import { retriveFromLocalStorage } from '@/utils/local.storage'
import axios from 'axios'
import { useSession } from 'next-auth/react'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const session = useSession()

    const xTenantId = retriveFromLocalStorage('xTenentId')

    if (session.data) {
      config.headers['Authorization'] = `Bearer ${session.data?.accessToken}`
      config.headers['X-Tenant'] = `${xTenantId}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
