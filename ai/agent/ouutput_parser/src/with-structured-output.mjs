// 从tool-call zod shema 得到灵感， 可以直接 tool-call? 
import "dotenv/config";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  }
});

const scientistSchema = z.object({
  name: z.string().describe('科学家的姓名'),
  birth_year: z.number().describe('出生年份'),
  nationality: z.string().describe('国籍'),
  fields: z.array(z.string()).describe('研究领域列表'),
});

// const modelWithTool = model.bindTools([
//   // 偏门
//   // llm 调用的上下文
//   {
//     name: "extract_scientist_info",
//     description: "提取和结构化科学家的详细信息",
//     schema: scientistSchema,
//   }
// ]);

const structureModel = model.withStructuredOutput(scientistSchema);
