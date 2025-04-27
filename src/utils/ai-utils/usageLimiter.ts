// src/utils/ai-utils/usageLimiter.ts

export async function checkLimitAndLogUsage(deviceId: string, app: string, prompt: string) {
  try {
    const supabaseUrl = "https://bfpeaeeshgwlmchixhbv.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmcGVhZWVzaGd3bG1jaGl4aGJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU1OTg0ODEsImV4cCI6MjA2MTE3NDQ4MX0.uE2rSJIExKYPCMvTCmiTzE6k_fbA0mRtggD_UGD20L4";

    const response = await fetch(`${supabaseUrl}/rest/v1/usage_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=representation"  // <-- FIX HERE! (was missing or wrong)
      },
      body: JSON.stringify({
        device_id: deviceId,
        app: app || "StoryBuddy",
        prompt: prompt,
        used_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Supabase Insert Error:", errorText);
      throw new Error("Failed to insert usage log");
    }

    console.log("✅ Logged usage successfully");
    return { allowed: true };
  } catch (error) {
    console.error("⚠️ Usage limiter error:", error);
    return { allowed: true }; // fallback allow
  }
}
