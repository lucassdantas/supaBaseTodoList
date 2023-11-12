import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lanhzczmejazebvplxeo.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhbmh6Y3ptZWphemVidnBseGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3NDY1NjMsImV4cCI6MjAxNTMyMjU2M30.ZItmS_umv_kdP0HOnexgUEr1M4lfFFqehksuOjkm4sI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)