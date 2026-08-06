// =========================================================
// RVA CORPORATION
// SUPABASE CONFIGURATION
// =========================================================

const SUPABASE_URL =
    "https://amtowqzobrlfdhdicxqd.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_FsthuMf-C54MJc1mEotefg_zSoFiFJV";


const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// Check connection
console.log("RVA Supabase initialized.");