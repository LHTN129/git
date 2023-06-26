import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://wnugialrcqkuthwqnhiz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndudWdpYWxyY3FrdXRod3FuaGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODczOTg2MjcsImV4cCI6MjAwMjk3NDYyN30.S30Zsl3PBYwqWiMv7e4-izMM5NImm_zeDo1q5G1Yw1Q"
);
