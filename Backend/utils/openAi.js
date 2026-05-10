import "dotenv/config";


const getOpenAIResponse = async (message) => {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "groq/compound-mini",
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
    console.log(result.choices[0].message.content);
    return result;
  } catch (error) {
    console.log(error);
  }
};


export default getOpenAIResponse;



