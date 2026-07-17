import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

export const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: process.env.DASHSCOPE_BASE_URL,
});
// app.service.mjs是大型项目的风格，app应用 service 获取llm服务
// 模块化输出因为client复用了
