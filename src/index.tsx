import React from 'react'
import App from "./app/App"
import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient= new QueryClient()
const container = document.getElementById('app-root')!
const root = createRoot(container)
root.render(<React.StrictMode><QueryClientProvider client={queryClient}><App /></QueryClientProvider></React.StrictMode>)