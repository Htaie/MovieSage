import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '../constants/constants';

const supabaseUrl = 'https://vgmwwmeokixssdlcxyba.supabase.co';
const supabaseKey = SUPABASE_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
