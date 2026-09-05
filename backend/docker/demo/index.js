// node 早期的规范
const http = require('http');
const server = http.createServer((req,res)=>{
   console.log("")
});
server.listen(1314,()=>{
   console.log("server is running at http://localhost:3000")
})