# 入手AI，需要搞懂那几个关键概念？

## Agent（智能体）
现在最值钱的就是Agent，Agent工程师 已经取代传统软件工程师，刷新工资的上限。
FDE通过开发各种Agent，帮助企业AI落地，将本增效。
现在很多Ai产品，本质已经是Agent了。 Cursor/Claude  Code/codex/豆包/悟空/opclaw/hermes/ Woekbuddy/飞书cli,核心都一样，能帮我们干活。
不只是回答问题，还能读文件，搜网络，写代码，操作浏览器，电脑，都是agent在做。
- 一个agent 有多强？取决于用了什么大脑（llm），装了什么工具，拿到了什么信息。 

##  LLM
大模型 是Agent的大脑 豆包背后字节的大模型， claude Anthorpic
LLM 只负责**推理**和**生成**。，真正的行动能力是靠tools

## Tools
llm只有推理生成能力，无法对接外部世界，tools可以补齐操作短板。
没有tools，ai只有空推理，无法完成自动化任务

- reasoning推理
给出llm 的规划和思维，方便我们了解和介入 
- messages 多轮对话列表
- reasoning_effort：'high'
- reasoning_content 推理过程
指导生成，流式输出
- content 

- 青岛啤酒股价多少？
llm 推理 要调用工具
getPrice 函数 结果
结果再在返回这个问题。
llm with tools?
open ai 提供了接口 tools
tool函数（llm理解 需要的参数）
结果再交给llm，再completions 一次
