# 跨域

- nginx 反向代理
  - 前端项目 index.html nginx
  - 发出的请求 /api
  - :3001/ 
- vite  + mock.js  dev 
  
- http 之外的协议
- websocket
后端 sse server sent event
服务器单项数据流式输出
- jsonp json with padding
- cors



单项传输
用户发起请求 服务器反馈 一般服务器是不可以主动向用户发送数据的
** sse 流式 ** 服务器可以不断向浏览器推送数据 
响应头
Content-Type: text/event-stream;
Cache-Control: no-cache;
Connection: keep-alive;

qq之类的socket 是双工同通信（不是只有浏览器发送数据，服务器也可以） 两边发送数据 平等
在线状态

当他来到web端，就是websocket 协议 eg : B站的弹幕

- ws库
websocket 协议实现 
  - 链接的时候  url ws://localhost:8000/ws
   ws://localhost:8000/ws  分两步
   1. 链接http 服务器  要被websocket 服务器识别
   2. 101 status code switch protocol  切换协议  升级为websocket 协议
   基于http  web server 的socker 服务 双向通信建立了。
  - 基于事件机制 双向通信
  
websocket 不想要遵循http 协议的跨源策略 可以跨域 不去做常规的跨域解决

http   跨域： 不同域名  不同端口  不同协议  都会导致跨域问题 同源策略 拦截了跨域请求
## websocket 双工，为什么不用于llm的流式输出？
- 很多时候 websocket不适配，很多东西都要靠自己写