import 'dotenv/config'
import { ChatOpenAI } from '@langchain/openai'
// 把大模型输出解析成纯字符
// chain上 不用那么复杂， 直接 给我们content内容
import { StringOutputParser } from '@langchain/core/output_parsers';
// 让prompt好复用
// 以前都是硬编码，写在代码里面，不好模块化
// agent中很多业务都是prompt驱动，不同的用户，是同一套ai业务 只需要换身份就好 PromptTemplate

// 会在Ai工作流的前面的位置
import { PromptTemplate } from '@langchain/core/prompts'
// llm
// 创意性更多 适合不同的业务
const creativeModel=new ChatOpenAI({
  modelName:'deepseek-v4-pro',
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0.8,
  topK:4, // 仅从概率前4的词汇里采样 ，限制跑偏
  maxTokens: 600, 
  configuration: {
    baseURL: 'https://api.deepseek.com/v1',
  },
});
// 严谨的
const preciseModel=new ChatOpenAI({
  modelName:'deepseek-v4-pro',
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0.2,//保守
  topK:8, // 仅从概率前8的，保证信息的完整性
  maxTokens: 600, 
  configuration: {
    baseURL: 'https://api.deepseek.com/v1',
  },
});

const storyPrompt =PromptTemplate.fromTemplate(`
  请写一篇短篇散文，主题：{theme} 风格温柔治愈，篇幅200字左右，不要分段，文字细腻又画面感。
`)

// 输出解释器 ，统一返回纯文本
const outputParser=new StringOutputParser()
// 工作流pipe一下  工作流的流转
// ai 工程复杂  设计好了ai工作流
const creativeChain=storyPrompt.pipe(creativeModel).pipe(outputParser)
// 各种AI 的工作流
const preciseChain=storyPrompt.pipe(preciseModel).pipe(outputParser)

// 原料送到流水线上生产？
async function runWriteDemo(){
  const theme ="秋日山野晚风"
  console.log('创意写作模式')
  const creativeText=await creativeChain.invoke({theme})
  console.log(creativeText)
  console.log('严谨写作模式')
  const preciseText=await preciseChain.invoke({theme})
  console.log(preciseText)
}

runWriteDemo().catch(err=>{
    console.error(err)}) 
