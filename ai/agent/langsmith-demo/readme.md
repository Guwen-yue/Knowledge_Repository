# langchain 全链路观测 ： 从Agent 调试到RAG量化评估

## trace 追踪
langchain\langgraph 开发Agent 强烈的“盲盒感”

调用了那个工具？每一步耗时多少？流式的token，消耗了多少token？

如果你无法度量他，你就无法管理他，
给Agent 加上全生命周期的客观观测性，LangSmith是不可或缺的仪表盘 

## 核心功能
- Tracing 追踪bug 调试agent
  每次agent 的执行
- Monitoring 
  agent 后台实时监控
  llm token 开销 时间 ，工具
- Datasets
  数据集 ，问题-回答 对
- Evaluation 
  评估器 ， 评估agent的回答

langSmith trace graph 的运行 ，考到了整体统计的monitor 数据。
Agent 运行情况 一目了然 ，非常方便接入全链路的观测。
对业务效果做标准化评估
  Dataset 测试样本，统一存放用户提问 和标准答案  （搭建数据集）
  在通过Evaluation 设定打分，批量完成自动化评估，精确衡量回答质量 ， 优化 Agent 和rag 相关业务逻辑。

  