import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import 'react-native-get-random-values';

import LargeSecureStore from './LargeSecureStorage';

// Check https://supabase.com/docs/reference/javascript/initializing
const supabaseUrl = '<supabase project url>';
const supabaseAnonKey = '<supabase key>';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: new LargeSecureStore(),
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
