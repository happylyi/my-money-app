import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mudgzzkcmaahxkwvquto.supabase.co';
const supabaseAnonKey = 'sb_publishable_MfUkvDUQ-Aa4Bq5OL5zaXg_8bjraQmU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);