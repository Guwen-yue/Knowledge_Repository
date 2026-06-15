// node自带的http模块
// 早期的js 特别是前端没有模块化系
// node 一定要上模块化方案 require + module.exports
// esm是升级版 import + export default
// require node早期的模块化系统commonjs

const http = require("http");
// 伺服状态 
http.createServer((req,res)=>{
  // 这个是用户服务函数
  const todos =[{
    id:"1",
    title:"过四六级",
    completed:false
  },{
    id:"2",
    title:"回家过节",
    completed:false
  }]
// 跨域问题
  res.setHeader("Access-Control-Allow-Origin","*")
// 响应头 告诉他是json格式
  res.setHeader("Content-Type","application/json; charset=utf-8")
  // req 用户对象
  if(req.url=="/"){
    res.end("hello world")
  }
  if(req.url=="/todos"){
    // 二进制文本 拍成json字符串
    res.end(JSON.stringify(todos))
  }
},
).listen(3000,()=>{
  console.log("server is running at 3000port")
})
// 就是一个这个代表