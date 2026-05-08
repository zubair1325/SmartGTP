// this file is not the part of the main project,
// just to explore different way to get OpenAI outputs
//here openai package is used to get the output directly

import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function main() {
  const response = await client.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "openai/gpt-oss-20b",
  });

  console.log(response.choices[0].message.content);
}

main();
