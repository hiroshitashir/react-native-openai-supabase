import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import 'react-native-get-random-values';

import LargeSecureStore from './LargeSecureStorage';

const supabaseUrl = 'https://zovppyzjjownleuizeri.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdnBweXpqam93bmxldWl6ZXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMTUwNjcsImV4cCI6MjAxNjc5MTA2N30.zETgj1AHbvku5gFQ0MMW7oMmxvgR2XZ5yK9u7QxBS8A';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
