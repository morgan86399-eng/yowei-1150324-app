import { createClient } from "@supabase/supabase-js";

// 用這把鑰匙才能更改資料庫的內容 (最高權限，只限後端 API 使用)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
