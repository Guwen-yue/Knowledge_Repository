# Generative AI
英伟达证书

- api key
  - gitignore + .env
- npm init -y
      初始化node项目 package.json文件
- npm install openai
      安装openai模块 事实标准 模块 
      - 安装需要花时间，消耗空间
      - pnpm 只需要安装一次，可以在不同德项目中进行软连接。 
        npm install -g pnpm
- .gitignore 
      忽略提交可以忽略德文件申明：api_key不可提交要留在本地，放到.env文件里忽略他
- api_key 读取进来德流程
    dotenv库 默认读取根目录下的.env文件
    .env文件有格式要求
    key(大写) =value 换行
    读取到process 进程对象中
    .env文件就是环境变量的配置文件
    .gitignore中忽略.env文件 本地跑，远程不提交
    process 是一个全局对象 
    
- mjs 后缀
    js后缀
    mjs ：module.js
    es6才推出的最新现代化模块化方案
    如果要在js中用 -> package.json 中 type属性 type: "module",
- nodemon 
    监听文件变化，自动重启进程
    安装：npm install -g nodemon
    使用：nodemon index.mjs
## async/await
  es8 新增的异步编程语法
  js 代码的编写顺序和执行顺序有时候不同
  变量声明/异步任务（setTimeout,api请求 ）
  async/await 来卡住执行流程
  api返回结果后继续执行后面的代码

## AIGC 工程化开发流程总结
- AI项目/Agent项目 几乎都是后端
- npm init -y 初始化node项目 package.json文件，为一个后端项目
- pnpm i openai/dotenv
- 实例化client
- main 单点入口函数
  - main.mjs  单点入口文件
  - main 单点入口函数
  
- 调用chat completion api 
  - 同步 按照顺序执行，很快执行
  - 异步 执行满/等待执行 耗时长
  控制异步的执行顺序
  async await 代码可读性更好，控制执行流程
  