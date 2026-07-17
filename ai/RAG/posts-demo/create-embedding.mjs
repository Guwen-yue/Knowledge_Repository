// posts.json向量化
// node 内置的fs模块 读取文件到内存
// JSON.parse 解析字符串为对象 ,这样每一项 await 去拿到embedding 加到 数组中
// 持久化到文件 embeddings存储
// 09年左右 node 出圈了 es6 2015 年 支持promise 的fs 模块
// node 后端， 系统层的api 
import fs from 'fs/promises';// 支持promise 的fs 模块
import { client } from './app.service.mjs';

// 上下文的路径 
const inputFilePath = './data/posts.json';
const outputFilePath = './data/posts-embedding.json';

// node 新版 全局直接await ，不用async 
// I/O 操作  硬盘到内存
// 文件 二进制文本
const data = await fs.readFile(inputFilePath, 'utf-8');
// console.log(typeof data);
const posts = JSON.parse(data);
// console.log(posts[0]);

const sleep = (ms) => 
    new Promise(resolve => setTimeout(resolve, ms));

const postsWithEmbedding = [];
 
// 代码的可读性
for (const { title, category } of posts) {
  const response = await client.embeddings.create({
    model: 'text-embedding-v4',
    // 语义更准确， 可以细致的语义匹配
    input:`标题：${title}，分类：${category}`
  });
  postsWithEmbedding.push({
    title,
    category,
    embedding: response.data[0].embedding
  })
  await sleep(200);
}
console.log("成功写入文件就是一个这样的");
// 写入文件
await fs.writeFile(
  outputFilePath,JSON.stringify(postsWithEmbedding, null, 2)//前面那个是目标文件，后面那个是写入的内容，缩进两个空格
)
   
