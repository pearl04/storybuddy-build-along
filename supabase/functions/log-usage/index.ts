// supabase/functions/log-usage/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { deviceId, app, prompt } = await req.json();

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!
  );

  const { error } = await supabaseClient.from("usage_logs").insert({
    device_id: deviceId,
    app,
    prompt,
    used_at: new Date().toISOString(),
  });

  if (error) {
    return new Response(JSON.stringify({ success: false }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
