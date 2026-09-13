// 从tool-call zod shema 得到灵感， 可以直接 tool-call? 
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";

import { XMLOutputParser } from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  }
});

const parser =new XMLOutputParser();
const question =` 请提取以下文本的任务信息：爱因斯坦出生在1879年3月14日，是一位伟大的物理学家，他的研究领域包括相对论物理和量子力学。
${parser.getFormatInstructions()}`
console.log(question)

// console.log(model,parser,question)
try {
  console.log('开始调用模型...');
  const result = await model.invoke(question);
  console.log(result);
} catch (error) {
  console.error('模型调用失败:', error);
}
