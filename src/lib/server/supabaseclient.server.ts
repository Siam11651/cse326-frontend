import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(import.meta.env.VITE_DB_LINK, import.meta.env.VITE_DB_KEY)