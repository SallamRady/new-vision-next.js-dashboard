'use client'
import { Provider } from 'react-redux'
import { store } from './store.redux'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { existInLocalStorage } from '@/utils/local.storage'
import { useRouter } from 'next/navigation'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a query client instance
  const router = useRouter()
  const [queryClient] = useState(() => new QueryClient())

  //check user is logged in
  useEffect(() => {
    if (!existInLocalStorage('token')) {
      router.push('/login')
    }
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}
