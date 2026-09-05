import 'dotenv/config'
// ChatOpenAI 来自 @langchain/openai，不是 langchain/chat_history
import { ChatOpenAI } from '@langchain/openai'
// 内存记忆：正确的类名是 InMemoryChatMessageHistory
import { InMemoryChatMessageHistory } from '@langchain/core/chat_history'
import {
  HumanMessage, SystemMessage
} from '@langchain/core/messages'

const model = new ChatOpenAI({
  modelName: process.env.MODEL_NAME,
  apiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: process.env.OPENAI_API_BASE_URL,
  }
})

async function inMemoryDemo() {
  const history = new InMemoryChatMessageHistory()
  const systemMessage = new SystemMessage({ content: '你是一个专业的翻译' })
  history.addMessage(systemMessage)
  console.log("[第一轮对话]")
  const userMessage = new HumanMessage('你今天吃的什么？')
  await history.addMessage(userMessage) // messages数组添加了对话
  // 第一轮对话
  const messages1 = [...(await history.getMessages())]
  console.log(messages1)
  const response = await model.invoke(messages1)
  console.log(`助手：${response.content}\n`)
  await history.addMessage(response) // messages数组添加了对话

  console.log("[第二轮对话基于历史记录]")
  const userMessage2 = new HumanMessage('你今天吃的什么？')
  await history.addMessage(userMessage2) // messages数组添加了对话
  // 第二轮对话
  const messages2 = [...(await history.getMessages())]
  const response2 = await model.invoke(messages2)
  console.log(`助手：${response2.content}\n`)
  await history.addMessage(response2) // messages数组添加了对话

  const allMessages = await history.getMessages()
  console.log(`共保存了${allMessages.length}条对话`)
  allMessages.forEach((message, index) => {
    const type = message.getType()
    const prefix = type === 'human' ? '用户' : (type === 'ai' ? '助手' : '系统')
    console.log(`${index + 1}.[${prefix}]:${String(message.content).substring(0, 50)}`)
  })
}
// promise<T>
inMemoryDemo().catch(console.error).finally(() => {
  console.log("done")
})
