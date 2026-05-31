# 吴恩达AI应用种的Prompt

## Prompt Principles
- 使用清晰且详细的Prompt
- 五个构建块
- llm 响应约束返回的结构


## get_response  函数
- 参数的默认值是函数的代码优化的重要语法特性
- 好复用，灵活，简便，
- llm的api
    - completions  完成 aigc 生成 
       只要一个prompt就可以
    - chat + completions 接口 对话的形式
      messages : [{role:'user',content:'你好'},{"role":"assistant",content:""},{"role":"user",content:"你好"},{"role":"system",content:"你是一个专业的翻译"}]

## 吴恩达 prompy 规则
llm 智能能力高级，靠谱的为我们工作？
通过一系列规则，减少智能的随机性。 

- 准确且具体的表达
    清晰 让大模型理解我们的目的，不偏离主题或少犯错误
    具体 提供上下文
    - 总结的案例里使用清晰的格式区间，告诉llm我们待处理的文本是在哪里  {}占位符
     使用特殊的符号``` 来清晰的指出要处理的文本 
     总结，summarize  nlp机器学习的常见任务 
- 对响应的结果格式做一个约束，一般为json格式
    继续丰富json的key , 还加点注释（自燃语义的加持）

- Few-shot 即少样本提示，在 Prompt 里附带少量示例，让模型参照格式、逻辑与风格，快速对齐任务要求，无需复杂指令。
- llm 有幻觉的，真真假假？
  
    