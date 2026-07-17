import "dotenv/config";
import { ChatOpenAI } from '@langchain/openai';
import { tool } from '@langchain/core/tools';
// 
import { 
  HumanMessage,// user 
  SystemMessage,// system
  ToolMessage,// assistant
  AIMessage,// assistant
 } from '@langchain/core/messages';
import fs from 'fs/promises';
import { z } from "zod"; // z 提供类型约束

const model = new ChatOpenAI({
  modelName: 'deepseek-v4-flash',
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0,// 严谨模式越小越严谨
  configuration: {
    baseURL: 'https://api.deepseek.com/v1',
  }
});

// 读取文件工具
const readFileTool = tool(
  async({
    filePath,
  })=>{ //功能函数
    const content = await fs.readFile(filePath, 'utf-8');
    // 时刻反馈agent执行任务信息
    // agent 任务可能很复杂，很耗时，需要给用户反馈
    console.log(`[工具调用]read_file ${filePath}成功读取，内容为：${content}`)
    return content;
  },
  {
    name: 'read_file',
    description: '用此工具来读取指定路径的本地文件内容，当用户读取文化部，查看代码，分析文件时，调用此工具。输入文件路径（可以是绝对路径或相对路径）',
    schema: z.object({//里面约束约束的是参数的格式
      filePath: z.string().describe("文件的绝对或相对路径"),
    })
  }
)
// 多个工具 
const tools =[
  readFileTool

]
// langchain 提供了llm和tools注册的抽象
const modelWithTools = model.bindTools(tools);
const messages=[
  new SystemMessage(`你是以一个代码助手，可以使用工具读取文件并解释代码。
    工作流程：
    1.用户读取文件时，立即嗲用read_file工具。
    2. 等待工具返回文件按内容。
    3. 基于文件内容进行分析和解释。
    可用工具：
    - read_file：  读取文件内容(使用此工具来获取文件内容)
    `),
    new HumanMessage("请读取tool.mjs文件内容并解释代码")
];

let response = await modelWithTools.invoke(messages);
// console.log(JSON.stringify(response))
messages.push(response);

 
