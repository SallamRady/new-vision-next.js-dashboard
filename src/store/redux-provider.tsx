'use client'
import { Provider } from 'react-redux'
import { store } from './store.redux'
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a query client instance
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}
