/**
 * SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zeWh0bHltbXhvamN1cGJnc2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5Mzg1MjQsImV4cCI6MjA2MjUxNDUyNH0.4RwQORXRfymVZigPvqiAKmHUSkTUprz-iuo0vJ4YlG4"
 * SUPABASE_URL="https://nsyhtlymmxojcupbgsaw.supabase.co"
 * */
import { createClient } from "@supabase/supabase-js";
import * as process from "node:process";

const client = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!
);

export default client;