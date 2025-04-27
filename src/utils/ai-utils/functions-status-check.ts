// src/utils/ai-utils/functionsStatusCheck.ts

export async function checkFunctionsHealth() {
    try {
      const endpoints = [
        "/functions/v1/get-openrouter-key",
        "/functions/v1/check-limit",
        "/functions/v1/log-usage",
      ];
  
      const results = await Promise.all(
        endpoints.map(async (endpoint) => {
          const res = await fetch(endpoint, { method: "OPTIONS" });
          return { endpoint, ok: res.ok };
        })
      );
  
      const failed = results.filter((r) => !r.ok);
  
      if (failed.length > 0) {
        console.error("Some Supabase functions are NOT healthy:", failed);
        return { healthy: false, failed };
      }
  
      console.log("✅ All Supabase functions healthy");
      return { healthy: true };
    } catch (error: any) {
      console.error("Function health check error:", error.message);
      return { healthy: false, error: error.message };
    }
  }
  