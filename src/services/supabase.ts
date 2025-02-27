import { createClient } from '@supabase/supabase-js';

// These keys are safe to use in a client-side application as mentioned in the requirements
// For educational purpose only
const supabaseUrl = 'https://vgqthaabhrxrpnhigftj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZncXRoYWFiaHJ4cnBuaGlnZnRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MzU5MzgsImV4cCI6MjA1NjIxMTkzOH0.4C2s0YLbTFw7Bl50g845mXvQBV7pOjQTJ_MuoIjSb6E';

export const supabase = createClient(supabaseUrl, supabaseKey);
