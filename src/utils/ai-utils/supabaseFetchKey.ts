export async function fetchOpenRouterKey() {
  try {
    const res = await fetch("/functions/v1/get-openrouter-key", {
      method: "POST",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch OpenRouter Key", await res.text());
      return null;
    }

    const { key } = await res.json();
    console.log("✅ OpenRouter key fetched:", key);
    return key;
  } catch (error) {
    console.error("❌ Error fetching OpenRouter Key:", error);
    return null;
  }
}
