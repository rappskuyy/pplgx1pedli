import { createClient } from '@supabase/supabase-js';

// Ganti dengan URL dan Anon Key dari Supabase Dashboard → Settings → API
const SUPABASE_URL = 'https://edyddsvrdhyhsltfktfi.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkeWRkc3ZyZGh5aHNsdGZrdGZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NjQ0MjAsImV4cCI6MjA4NjU0MDQyMH0.Vt2uTp2jO_1IbaFG8LwMeIgHIcRlcQaB2UZix5jEkTg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
