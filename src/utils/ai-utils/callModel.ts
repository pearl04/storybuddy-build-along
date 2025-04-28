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

    // Build a strong story prompt using the input
    const fullPrompt = `
    Write a magical bedtime story of at least 8 lines.
    User's input to inspire the story: "${prompt}".
    Make it imaginative, heartwarming, easy for kids to understand, and end with a positive message.
    `;

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4.1-nano",
        messages: [
          { role: "system", content: "You are a creative bedtime storyteller." },
          { role: "user", content: fullPrompt },
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

    const storyContent = data?.choices?.[0]?.message?.content?.trim();

    if (!storyContent) {
      console.error("❌ No story content generated!");
      return null;
    }

    return storyContent;
  } catch (error) {
    console.error("❌ Error calling AI model:", error);
    return null;
  }
}
