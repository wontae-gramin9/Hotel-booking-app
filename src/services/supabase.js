import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://kavvwqrrjwpiuwwrghit.supabase.co";
// Row lever security로 권한을 막아놓았기 때문에, key가 클라이언트에 올라가도 괜찮다.
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImthdnZ3cXJyandwaXV3d3JnaGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3NzU3NTAsImV4cCI6MjAzODM1MTc1MH0.yNNvlANgA0yFmSpPPdtMSG9AjrdvMpmMfPiGBke5p-0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
