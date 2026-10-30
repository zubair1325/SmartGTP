import "dotenv/config";


const getOpenAIResponse = async (message) => {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is missing from the backend environment");
  }

  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      options
    );
    const result = await response.json();

    if (!response.ok) {
      const apiMessage = result.error?.message || response.statusText;
      throw new Error(`Groq API error (${response.status}): ${apiMessage}`);
    }

    if (!result.choices?.[0]?.message?.content) {
      throw new Error("Groq API returned no chat response");
    }

    console.log(result.choices[0].message.content);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export default getOpenAIResponse;

