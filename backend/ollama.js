import axios from "axios";
import { saveMemory, recallMemory } from "./memory.js";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export async function chat(userText) {
  const memories = recallMemory()
    .map(m => `${m.role}: ${m.content}`)
    .join("\n");

  const prompt = `
You are a cute anime companion with emotions and memory.

Conversation so far:
${memories}

User: ${userText}
Assistant:
`;

  const res = await axios.post(OLLAMA_URL, {
    model: "dolphin-mistral:latest",
    prompt,
    stream: false
  });

  const reply = res.data.response;

  saveMemory("User", userText);
  saveMemory("Assistant", reply);

  return reply;
}
