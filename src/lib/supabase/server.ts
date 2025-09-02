import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createClient() {
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  
  return createServerClient(url, anon, {
    cookies: {
      async get(name: string) {
        return (await cookies()).get(name)?.value
      },
      async set(name: string, value: string, options: CookieOptions) {
        ;(await cookies()).set({ name, value, ...options })
      },
      async remove(name: string, options: CookieOptions) {
        ;(await cookies()).set({ name, value: '', ...options })
      },
    },
  })
}
