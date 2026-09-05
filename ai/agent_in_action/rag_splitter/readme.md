# Document 切割

- 知识库 放的只是
  只是的来源很多，一个word文档，一个pdf文件，一个bilibili视频，一个url ，一个图片
  各种格式的文件  -> 向量化前的Document？ loader  
  不能直接创建Document 对象 
  怎么处理一下
  Docuument ？ langchain 提供的标准格式文档 pageContent pagedata 
  
## loader
知识库 -> 向量数据库
各种知识文件 ，后缀，不同的文件也有不同的loader
输入是文件 ，输出是Documents
两件事情要做
1. 选择相应的loader  180多种
2. 分块  文件太大 ，要检索的是一定大小具有一定语义的chunk
来自社区 @langchain/community 主要有社区维护， 我们都可以写loader 
langchain  @langchain/core 官方维护的

- 爬虫 crawl
  - 从目标 url 开始 发送请求 拿到html 字符串
  - 从解析html字符串 提取需要的文本内容 (正则)
  - cheerio 另辟蹊径 ，前端 思维 css 选择器 需要的内容 
    cheerio.load(html) document对象
    $(css.selector).trxt()

## AI 时代程序员价值
- 不再是coding，交给ai
- vibe coding 问出好问题 提供丰富准确的上下文（context），驾驭（harness）并部署（FDE）Agent ，设计长时间稳定运行的loop ，用好ai
  快速成为一名ai 架构师。
  

- 切割的意义
  保持语义的完整性
  - separtors 语义的最基本构成符号 .?！ ，不会是,
  - 按chunkSize 大小 切割
  - 切断了，chunk 最后一句和下一个chunk第一，他们的语义相关性是最大的，但是因为chunkSize切开了，语义遗憾用overlap用一定的冗余来确保语义的完整性