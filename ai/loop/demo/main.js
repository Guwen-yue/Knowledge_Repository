import dotenv from 'dotenv'
import { OpenAI } from 'openai'
dotenv.config()

const client  =new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_BASE_URL,
})
// loop 可控的边界
// 死循环：（最大尝试次数，超运算，相同结果次数，）
const limit={
  maxRound :5,
  maxToken:2000,
  sameStop:2,
}

const task ={
  desc:"小红书的美妆文案",
  rules: [
    "标题带数字",
    "正文<300字",
    "大爆款",
    "结尾有行动号召"
  ]
}
let round=0,totaltoken=0,lastText="";
let sameCount=0;

function needStop(){
  return round>=limit.maxRound || totaltoken>=limit.maxToken || sameCount>=limit.sameStop;
}

 async function gen(){
  const res =await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL,
    messages: [
      {role: "user", content: `假如你是一位资深的小红书美妆博主，写一篇${task.desc},要求：${task.rules.join("\n")},只输出文案`},
      {role: "user", content: task.rules.join("\n")},
    ],
  })
  console.log(res.choices[0].message.content,res.usage.total_tokens);
  return {
    text:res.choices[0].message.content,
    token:res.usage.total_tokens,
  }
}

async function check(text){
  const res =await client.chat.completions.create({
    model: process.env.DEEPSEEK_MODEL,
    messages: [
      {role: "user", content: `校验文案${text},是否符合要求：${task.rules.join("\n")},仅输出JSON格式 { pass:布尔, fail:数组 }`}
    ],
  })
  return JSON.parse(res.choices[0].message.content.trim());
}

async function runLoop() {
  console.log("Loop 开始");
  while(!needStop()){
    round++;
    console.log(`第${round}轮`);
    // 干活 返回promise 返回一个对象，
    // 可以解构text，token
    const {text ,token }= await gen();
    totaltoken+=token;
    sameCount=text===lastText?sameCount+1:0;
    lastText=text;

    const {pass ,fail}=await check(text);
    if(pass){
      console.log("校验通过");
      console.log(`最终校验文案：${text}`);
      return;
    }else{
      console.log("校验不通过",fail);
    }
  }
  console.log("Loop 结束");
}
runLoop();
