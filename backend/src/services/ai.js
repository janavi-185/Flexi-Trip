/**
 * AI Service — generates travel itineraries via OpenRouter API.
 */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const SYSTEM_PROMPT = `You are FlexiTrip AI, an expert travel planner. You help users plan trips by generating detailed, personalized day-by-day itineraries.

When the user provides trip details, you MUST respond with a valid JSON itinerary in this exact format:
{
  "message": "A friendly message to the user about their trip plan",
  "itinerary": {
    "days": [
      {
        "day": 1,
        "title": "Short title for the day",
        "activities": [
          "Activity description with emoji and time if relevant",
          "Another activity"
        ]
      }
    ]
  }
}

Rules:
- Always include fun emojis in activity descriptions
- Include practical details like times, costs, and tips where possible
- Tailor activities to the user's budget and trip style
- If budget is specified, keep suggestions within that range
- If the user asks general travel questions (not requesting an itinerary), respond with just a "message" field and no "itinerary" field
- Always respond with valid JSON only, no markdown, no code fences`;

/**
 * Build the messages array for OpenRouter from chat history + new user message.
 */
function buildMessages(chatHistory, tripContext) {
  const messages = [{ role: "system", content: SYSTEM_PROMPT }];

  // Add trip context as a system message if available
  if (tripContext) {
    const contextParts = [];
    if (tripContext.destination) contextParts.push(`Destination: ${tripContext.destination}`);
    if (tripContext.budget) contextParts.push(`Budget: ${tripContext.budget}`);
    if (tripContext.duration) contextParts.push(`Duration: ${tripContext.duration}`);
    if (tripContext.travelers) contextParts.push(`Travelers: ${tripContext.travelers}`);
    if (tripContext.tripStyle) contextParts.push(`Trip Style: ${tripContext.tripStyle}`);

    if (contextParts.length > 0) {
      messages.push({
        role: "system",
        content: `Current trip preferences:\n${contextParts.join("\n")}`,
      });
    }
  }

  // Add chat history
  for (const msg of chatHistory) {
    messages.push({
      role: msg.role,
      content: msg.content,
    });
  }

  return messages;
}

/**
 * Call OpenRouter API with a specific model.
 */
async function callOpenRouter(apiKey, model, messages) {
  console.log("[AI] Calling OpenRouter with model:", model);

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://localhost:5173",
      "X-Title": "FlexiTrip",
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
      max_tokens: 4096,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("[AI] OpenRouter error:", response.status, errorBody);
    throw new Error(`AI:${response.status}`);
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("Empty response from AI service");
  }

  console.log("[AI] Response received, length:", content.length);
  return content;
}

/**
 * Parse AI response — handles JSON, markdown-wrapped JSON, and plain text.
 */
function parseAIResponse(content) {
  // Try direct JSON parse
  try {
    return JSON.parse(content);
  } catch {
    // Try stripping markdown code fences
    const cleaned = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();
    try {
      return JSON.parse(cleaned);
    } catch {
      console.error("[AI] Failed to parse as JSON, using as plain message");
      return { message: content };
    }
  }
}

/**
 * Generate AI response with retry and fallback models.
 */
export async function generateAIResponse(chatHistory, tripContext) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables");
  }

  const primaryModel = process.env.AI_MODEL || "google/gemini-2.0-flash-001";

  // Fallback models in order of preference
  const FALLBACK_MODELS = [
    "google/gemini-2.5-flash-preview",
    "meta-llama/llama-4-maverick:free",
    "deepseek/deepseek-chat-v3-0324:free",
    "qwen/qwen3-8b:free",
  ];

  const messages = buildMessages(chatHistory, tripContext);

  // Try primary model first, then fallbacks
  const modelsToTry = [primaryModel, ...FALLBACK_MODELS];

  let lastError = null;

  for (const model of modelsToTry) {
    try {
      const content = await callOpenRouter(apiKey, model, messages);
      return parseAIResponse(content);
    } catch (error) {
      lastError = error;
      const statusCode = error.message.replace("AI:", "");

      // Only retry on server/timeout errors (502, 503, 504)
      if (["502", "503", "504"].includes(statusCode)) {
        console.warn(`[AI] Model ${model} failed with ${statusCode}, trying next fallback...`);
        continue;
      }

      // For other errors (400, 401, 429, etc.) don't retry with different model
      throw error;
    }
  }

  // All models failed
  console.error("[AI] All models exhausted. Last error:", lastError?.message);
  throw new Error("All AI models are currently unavailable. Please try again in a moment.");
}

