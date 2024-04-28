import axios from 'axios';

export const generateOpenAiOutput = async (prompt: string) => {
  const openAiResponse = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'gpt-3.5-turbo-instruct',
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
