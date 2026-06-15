# 多模态
- 生图模型
- 前端项目
  axios /fetch http 调用llm endpoint
  api 写的是明文
  - dotenv node环境，process
  - 前端环境，怎么做api key .env

## 前端工程化 vite（npm init vite）
  - 页面开发
  - 工程开发

## vite 
  项目脚手架

## .env流程
- npm init vite
- npm install
- .env.local VITE_QWEN_API_KEY
- import.meta.env.VITE_QWEN_API_KEY
既能使用llm ，还可以保证key 不被泄露
VITE 就是前端项目在工程化这块的大管家
npm run dev VITE vite 接管整个项目