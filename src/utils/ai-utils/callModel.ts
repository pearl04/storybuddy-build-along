import { fetchOpenRouterKey } from "./supabaseFetchKey";
import { checkLimitAndLogUsage } from "./usageLimiter";

export async function callAIModel(deviceId: string, app: string, prompt: string) {
  console.log("🚀 Start callAIModel");

  const limitResult = await checkLimitAndLogUsage(deviceId, app, prompt);
  console.log("✅ checkLimitAndLogUsage done");

  if (!limitResult.allowed) {
    console.error("❌ Usage limit exceeded");
    return null;
  }

  try {
    console.log("⏳ Fetching OpenRouter API key...");
    const apiKey = await fetchOpenRouterKey();
    console.log("🔑 Got OpenRouter API Key");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    },
      body: JSON.stringify({
        model: "openrouter/optimus-alpha",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ OpenRouter error:", errorText);
      return null;
    }

    const data = await res.json();
    console.log("✅ OpenRouter response:", data);

    const storyContent = data?.choices?.[0]?.message?.content;

    if (!storyContent) {
      console.error("❌ No story content generated!");
      return null;
    }

    return storyContent.trim();
  } catch (error) {
    console.error("❌ Error calling AI model:", error);
    return null;
  }
}
