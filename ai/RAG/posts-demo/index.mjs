import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: process.env.DASHSCOPE_BASE_URL,
});

const response = await client.embeddings.create({
  model: 'text-embedding-v4',
  input: '洪圣大佬大三',
});
console.log(response);