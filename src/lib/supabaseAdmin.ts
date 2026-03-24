import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://cpojqkqtpcyxyzcjzxnv.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNwb2pxa3F0cGN5eHl6Y2p6eG52Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDA2ODI3NSwiZXhwIjoyMDg5NjQ0Mjc1fQ.NzQbxDXiGfGioQ6-P8pQZ2f0zvudqckcRVTPVzAE2AA';

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
