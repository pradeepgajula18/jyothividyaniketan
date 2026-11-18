import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://izfuuecmwemebaigmfgo.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_j6oJ3BdpguMc808ITEBGcQ_9v_y9xVm';

export const supabase = createClient(supabaseUrl, supabaseKey);

