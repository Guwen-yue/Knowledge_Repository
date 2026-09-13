# Langgraph

## 为什么需要多Agent
复杂的agent 产品基本都是多agent架构。
- langchain 工作流编排 线性的
- langgraph 工作流编排 网状的
- 上下文的开销
  单agent 架构下 ，所有tool的描述，每个功能的prompt 都放在system prompt 里
  实际上执行每个功能只需要其中的一部分prompt，但每次都要带上。
  token消耗更高，更重要的是很多无关信息干扰，思考效率低且容易出错。
- 分工
- 如何拆分多个Agent？
  每个只保留需要的prompt，执行的时候，消耗的token 更少，没有无关的信息干扰，准确率更高。
Agent = LLM（大脑） + harness （tool + mcp + rag + skill + ...）
单agent只有一个llm大脑，需要一步步思考 调用tool
规划
多agent 多个大脑 ，并行思考
主agent 下发任务，子agent秉性处理完成后返回
每个大脑需要适合的模型

agent 组合式，按需加载 ，动态加载
多agent 分工合作，编程agent 负责写代码，让测试agent 编写测试代码TDD，
让 验证agent 验证代码是否符合预期。告诉主Agent通过了。  

基于三个原因

- 决策准确率高，token 消耗低。
每个agent只要带最少prompt，没有冗余信息干扰。调用llm 次数多，但更省token.
- 并行思考和任务处理
  主管分盘子任务，子agent 并行处理，整体效率更高
- 多角色互相讨论，纠错能力更强， AutoGen 

## Langchian ->  Langgraph

- llm api document loaders splitter embedding vector store output parser
  memory ... 基础模块
- langchain 线性工作编排
- langgraph 网状工作编排
- 工作节点 + 组织方式（api）
- 简单Agent -> 复杂多Agent协作 
## 网状工作流编排api
- 开始节点
- 工作节点
  职责 状态
- 连接工作节点
  边
- 工作节点
  最终状态

## 分支 循环

## 持久化我们的状态？
不要每次从新执行， 用MemorySaver 来吧 state 保存到内存里 下次就会基于上次的state继续执行。
agent 执行中断 失败... 暂停 需要授权 MemorySaver 保存状态 之后继续运行·
保存到数据库sqlite redis 持久化

## harness