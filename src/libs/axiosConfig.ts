import { retriveFromLocalStorage } from '@/utils/local.storage'
import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  config => {
    const token = retriveFromLocalStorage('token'),
      xTenantId = retriveFromLocalStorage('xTenentId')

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      config.headers['X-Tenant'] = `${xTenantId}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
