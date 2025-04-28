import { checkLimitAndLogUsage } from "@/utils/ai-utils/usageLimiter";
export async function callAIModel(
  deviceId: string,
  app: string,
  name: string,
  age: number,
  theme: string
) {
  console.log("🚀 Start callAIModel");

  const limitResult = await checkLimitAndLogUsage(deviceId, app, `${name},${age},${theme}`);
  console.log("✅ checkLimitAndLogUsage done");

  if (!limitResult.allowed) {
    console.error("❌ Usage limit exceeded");
    return null;
  }

  try {
    if (!name || !theme || !age) {
      console.error("❌ Missing name, age, or theme!");
      return null;
    }

    const formattedPrompt = `
Please write a short, happy bedtime story for a child.

Child's Name: ${name}
Child's Age: ${age}
Theme: ${theme}

Make the story imaginative but simple, suitable for a ${age}-year-old.
Use the child's name "${name}" in the story.
Keep the story between 8 to 10 lines.
Always end the story on a positive and happy note.
`;

    const res = await fetch("/functions/v1/generate-story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: formattedPrompt,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Supabase function error:", errorText);
      return null;
    }

    const data = await res.json();
    console.log("✅ Story generated:", data);

    const storyContent = data?.story;

    if (!storyContent) {
      console.error("❌ No story content received!");
      return null;
    }

    return storyContent.trim();
  } catch (error) {
    console.error("❌ Error calling generate-story function:", error);
    return null;
  }
}
