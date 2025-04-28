export async function fetchOpenRouterKey() {
  try {
    const res = await fetch("https://bfpeaeeshgwlmchixhbv.supabase.co/functions/v1/get-openrouter-key", {
      headers: {
        "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcGVhZWVzaGd3bG1jaGl4aGJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTg0ODEsImV4cCI6MjA2MTE3NDQ4MX0.uE2rSJIExKYPCMvTCmiTzE6k_fbA0mRtggD_UGD20L4`,
      },
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
