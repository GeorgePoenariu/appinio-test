import axios from 'axios';

export const generateOpenAiOutput = async (prompt: string) => {
  const openAiResponse = await axios.post(
    process.env.OPENAI_URL,
    {
      model: process.env.OPENAI_MODEL,
      prompt,
      max_tokens: 200,
      stop: ['###'],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    },
  );
  return openAiResponse.data.choices[0].text.trim();
};
