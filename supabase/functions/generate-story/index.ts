import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim().length === 0) {
      console.error("Missing or empty prompt");
      return new Response(JSON.stringify({ error: "Prompt is required." }), { status: 400 });
    }

    const apiKey = Deno.env.get("OPENROUTER_API_KEY");

    if (!apiKey) {
      console.error("Missing OPENROUTER_API_KEY secret");
      return new Response(JSON.stringify({ error: "Server configuration error." }), { status: 500 });
    }

    const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4.1-nano",
        messages: [
          {
            role: "system",
            content:
              "You are a friendly assistant who writes short and fun bedtime stories for kids based on the given details. Always keep the story between 8 to 10 lines, use simple words, and end the story happily.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!openRouterRes.ok) {
      const errorText = await openRouterRes.text();
      console.error("OpenRouter API error:", errorText);
      return new Response(JSON.stringify({ error: "Story generation failed." }), { status: 502 });
    }

    const openRouterData = await openRouterRes.json();
    const story = openRouterData?.choices?.[0]?.message?.content;

    if (!story) {
      console.error("No story content in response");
      return new Response(JSON.stringify({ error: "No story generated." }), { status: 400 });
    }

    return new Response(JSON.stringify({ story }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        // Optional CORS header if you later open up
        // "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    console.error("Unexpected error generating story:", err);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
});
