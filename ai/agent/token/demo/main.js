// prompt(文本输入)  -> tokens(编码器)-> 向量化(embedding 数字语义) -> llm(transform) -> tokens(解码器) -> output(文本输出)
import OpenAI from 'openai'
import dotenv from 'dotenv'
dotenv.config()

const client = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: process.env.DASHSCOPE_BASE_URL,
})

// llm向量化的封装函数
async function getEmdedding(text) {
  // 文本 数学 高纬度 向量化  
  const response = await client.embeddings.create({
    // 嵌入模型 embedding  
    model: "text-embedding-v4",
    input: text,
    dimension: 1024, //维度
  })
  return response.data[0].embedding
}
//  余弦相似度
function cosineSimilarity(vecA, vecB) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] ** 2;
    magB += vecB[i] ** 2;
  }
  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}

async function run() {
  // 语义相似,但是文本匹配绝对不一样
  // embedding语义 1024维度 向量化-1 -> 1数学表达
  const test1="Andrej Karpathy LLM Tokenization 分词原理"
  const text2= "卡帕西讲解大模型BPE字词分词"
  const text3="今天天气晴朗,适合出门散步"
  const embedding1 = await getEmdedding(test1)
  const embedding2 = await getEmdedding(text2)
  const embedding3 = await getEmdedding(text3)
  // console.log(embedding1)
  // console.log(embedding2)
  console.log("向量维度:",embedding1.length)
  console.log("向量维度:",embedding2.length)
  console.log("余弦相似度:",cosineSimilarity(embedding1, embedding3))
}

run()