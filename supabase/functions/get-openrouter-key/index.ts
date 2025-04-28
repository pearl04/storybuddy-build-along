import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "https://storybuddy-build-along.vercel.app",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const openRouterApiKey = Deno.env.get("OPENROUTER_API_KEY");

  if (!openRouterApiKey) {
    return new Response(
      JSON.stringify({ msg: "Error: Missing OPENROUTER_API_KEY" }),
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(JSON.stringify({ key: openRouterApiKey }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
});
