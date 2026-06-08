// http 请求llm接口
// bun代替npm做包管理
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

async function chat(){
  // llm可能会出错，异常
    // timeout ,apikey错误
  try{
    // GET请求有上限且GET不安全 明文
    // 传图片 post 请求体可以
    // 请求行 url , method ,http version
    // 请求头 Authorization apikey
    // 请求体 body
    // fetch http 请求api
    // axios http请求的框架，封装了fetch，企业级别的。
    const res = await axios.post(`${process.env.DEEPSEEK_BASE_URL}`,
      {
        model:"deepseek-v4-flash",
        messages:[
          {
            role:"user",
            content:"你好,介绍一下bun包管理器"
          }
        ]
      },
      {
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${process.env.DEEPSEEK_API_KEY}`
        }
      }
    )
    // axios默认会在响应前带上data
    console.log(res.data.choices[0].message.content);
  }catch(err){
    console.log(err);
  }

}

chat()  