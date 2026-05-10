import { Groq } from "groq-sdk";


const groq = new Groq();
async function getOpenAiImageResponse() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "What's in this image?",
          },
          {
            type: "image_url",
            image_url: {
              url: "https://upload.wikimedia.org/wikipedia/commons/f/f2/LPU-v1-die.jpg",
            },
          },
        ],
      },
    ],
    model: "meta-llama/llama-4-scout-17b-16e-instruct",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  console.log(chatCompletion.choices[0].message.content);
}

export default getOpenAiImageResponse;
