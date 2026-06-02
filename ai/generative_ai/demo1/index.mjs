// .env文件中的apikey读取进来
// dotenv导入
import dotenv from 'dotenv'
import {OpenAI} from 'openai'

dotenv.config()
const client=new OpenAI({
    apiKey: process.env.DEEPSEEK_API_KEY,
    baseURL: process.env.DEEPSEEK_API_URL,
  })
// process进程对象
// console.log(process.env.DEEPSEEK_API_KEY, process.env.DEEPSEEK_API_URL)
// 操作系统德核心概念
// node index.mjs 本质是启动进程
// 进程是分配资源(内存，cpu，IO)德最小单位
// process.env 是一个对象 ，包含了环境变量

// 函数表达式
// async  修饰符,表示函数是异步的
// 函数内部是await 关键字 等待异步操作完成
// 省略 function 关键字，箭头函数
const main =async () =>{
  console.log('hello world1111') 
  const result=await client.chat.completions.create({
    model: "deepseek-chat",
    messages: [
      {
        role: "user",
        content: "你好"
      }
    ]
  })
  console.log(result.choices[0].message.content)
}

main();
