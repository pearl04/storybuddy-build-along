// supabase/functions/get-openrouter-key/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const openRouterKey = Deno.env.get("OPENROUTER_API_KEY");
  
  if (!openRouterKey) {
    return new Response("OpenRouter API key not set", { status: 500 });
  }

  return new Response(
    JSON.stringify({ key: openRouterKey }),
    { headers: { "Content-Type": "application/json" } }
  );
});
