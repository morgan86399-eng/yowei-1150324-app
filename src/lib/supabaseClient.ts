import { createBrowserClient } from '@supabase/ssr'

// Hard-coded credentials
const supabaseUrl = 'https://cpojqkqtpcyxyzcjzxnv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwb2pxa3F0cGN5eHl6Y2p6eG52Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQwNjgyNzUsImV4cCI6MjA4OTY0NDI3NX0.ka4MSM8XbizxtDR7olhtOf5ECc2kb0Gfbk6twl11EdU'

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseAnonKey
  )
