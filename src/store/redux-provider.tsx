'use client'
import { useState } from 'react'

import { Provider } from 'react-redux'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { store } from './store.redux'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  // Create a query client instance
  const [queryClient] = useState(() => new QueryClient())

  //check user is logged in

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  )
}
