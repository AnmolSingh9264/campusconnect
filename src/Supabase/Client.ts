import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lyyytbhlkaljcvzbawrv.supabase.co" //import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = "sb_publishable_3zA4EmXsQHbOA9I8Kn1Fsw_UJk-aW4l"//import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);