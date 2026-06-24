# Tool use 工具
工具调用，背后真正的技术逻辑，不止是api

- 豆包可以自动的搜索网页
  两个工具 日期获得工具 ，网络搜索工具
- claude  可以分析excel表格
  读取文件，excel 分析工具
- AI Agent 操作电脑  mac mini 

LLM +tool = agent

难道AI有自我意识吗？作为开发者 ，这是一个精心设计的错觉（用户以为是llm完成的，其实不是）
那个在显卡里面疯狂跑的llm ，本质上还是个词语接龙游戏。他是被困在服务器里的缸中大脑。他看不见屏幕，摸不到键盘

一个只能去预测下一个词的概率模型， Next Token Prediction 怎么突破物理限制 他是怎么去调用API ，怎么去读数据库，怎么去操作物理世界的工具的

## Tool Use
工具是函数，
- 认知的植入
  工具降维为语言，llm 只能做自然语言编程。
  在执行任务之前，
  在system prompt 里**配置工具**的时候 
  就是**认知植入**，Tool 成为语言？ 说
  大模型不懂什么是天气API，也不懂数据库查询，但hi他听得懂语言。
  JSON schema 去讲复杂的软件接口函数， 翻译成大模型能理解的使用**说明书**
  JSON tools 格式 ，schema？约束
  users name string not null unique 

  llm 概率随机， 工具描述得具体清晰 
  在这阶段，一个复杂的软件工具（get_close_price）,被降维成一个存粹的文本描述(json schema)
  用户提问 青岛啤酒的收盘价是多少？
  llm 回答不了
  llm告知调用工具 content “”  ,tool_calls 要调用的工具并中断执行. 含 id function name, arguments
  api转成语言的精确性（description,schema）
  用户提问：上海的天气怎么样？
  llm推理引擎开始工作，他会进行一系列的快速评估。
  首先，在原始语料训练中，问，不能回答。
  接着绕回来，认知植入里面有工具吗？
  他真有，get_weather工具。
  ai会停止和你的对话，转而开始自言自语，他按照我们刚刚定义的那套说明书，去生成一段自然语言的调用代码
  代码是：get_weather(city:"上海")
  llm不能执行，但是开发者可以
  它依赖的是强大的模式识别和逻辑推理能力。
  它赌这段代码发出后， 会有人响应。

- runtime介入
    传统软件runtime  调用工具，执行任务.node.python/java
    人/ai 都可以调用，只管一件事，执行，拿到结果。
    不是直接返回给用户，而是返回给大模型（用户调用接口），
    大模型再根据结构继续执行。
    在开始用户问什么，llm怎么决策runtime 给了什么,根据上下文，生成最后的返回。
- 
