

// controllers/prompt.controller.js
import { Prompt } from '../model/prompt.model.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'DeepSeekAI Clone',
  },
});

console.log('OpenRouter client initialized');

export const sendPrompt = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  console.log("🧾 Incoming Prompt:", content);
  console.log("👤 User ID:", userId);

  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    // Save user message
    await Prompt.create({
      userId,
      role: 'user',
      content,
    });

    // Send to OpenRouter API
    const completion = await openai.chat.completions.create({
      model: 'openai/gpt-4o',
      messages: [{ role: 'user', content }],
      max_tokens: 500,
    });

    console.log("OpenRouter Response:", JSON.stringify(completion, null, 2));

    const aiContent = completion.choices?.[0]?.message?.content;
    if (!aiContent) {
      throw new Error("AI reply missing from OpenRouter response");
    }

    // Save assistant message
    await Prompt.create({
      userId,
      role: 'assistant',
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });
  } catch (error) {
    console.error(' Error Details:', error?.response?.data || error.message || error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
