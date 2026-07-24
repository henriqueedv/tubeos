export async function getApiKey(): Promise<string> {
  return localStorage.getItem("ai_api_key") ?? "";
}

export async function saveApiKey(key: string) {
  localStorage.setItem("ai_api_key", key);
}

export async function getAIProvider(): Promise<
  "openai" | "gemini"
> {
  return (
    (localStorage.getItem("ai_provider") as
      | "openai"
      | "gemini") ?? "gemini"
  );
}

export async function saveAIProvider(
  provider: "openai" | "gemini"
) {
  localStorage.setItem(
    "ai_provider",
    provider
  );
}