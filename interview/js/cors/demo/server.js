
// module
const WebSocket = require('ws');
const http =require('http');
const { createWebSocketStream } = require('ws');
//  基于http在搭建socket协议
// 先要把http请求启动
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  res.end('WebSocket Server is running');
});
// { server,path:'/ws' }
// server 是http服务器
// path 是websocket 路径
const wss = new WebSocket.Server({ server,path:'/ws' });
//  监听事件 有人链接
wss.on('connection', (ws) => {
  console.log('Client connected');
  // 监听事件 有人发送消息
  ws.on('message', (message) => {
    console.log(`Received message:${message}`);
    // 回复消息
    ws.send(`Server received: ${message}`);
  });
});


server.listen(8000, () => {
  console.log('WebSocket Server is running on port 8000');
});
