# 上下文工程 context Engineering

22-23 Prompt Engineering 不确定性，正确的胡说八道
aigcs基于预训练的一部分
通过设计完美的提示词，升级到工程化的级别
chatgpt
github copilot aigc coding
我们开打，ai提效

24-25 context Engineering llm 幻觉
补全上下文  上下文工程
更靠谱
    更准确
不是直接利用预训练数据回答，在回答前，去线检索一些资料，加到prompt里面 -cursor / trae / 法律专家rag
cursor 基于vscode又干掉了 vscode
将我们的整个代码库作为上下文（技术架构 代码风格 功能模块 ） 让他去开发

25-26 Harness Engineering
claude code  codex 
小龙虾 记忆不如（token 太费 ） 爱马仕 hermes
llm 非常的牛逼，claude4.6 gemini3 有如千里马，用上马鞍，缰绳 ，在指定的环境和场景中跑的又快又好。 

规则，llm围栏 安全 可靠，loop engineering，skills mcp 
类似传统软件 确定交付的工程化 

llm工程化 终于在25-56年实现了，成熟了各个企业都拥抱了ai数字化， fde被大量需要

- 即使写出最完美的提示词，也可能得不到好结果。
为啥？aigc transformer 架构 根据预训练知识预测
LLM GPT 5 Gemini Ai 进化了，现在的mcp skills 。。。 
早期需要详细且准确的指令
现在随着ai发展，没有那么依赖了
- chatgpt 生成代码，身份 详细准确的任务，分步骤，例子，。。。
  长且工程化设计的prompt，大大提升生成代码的质量？

- cursor /trae/ cc简单的prompt就可以完成之前的复杂prompt的还要好
  - llm 更强大了 推理能力
  - ai和人类已经交互了数年，积累了海量数据 prompt数据
  - openai ，google ，claude，新的强大大模型，llm会自动优化你的提示词，ai理解了人类常见的需求模式
  - 上下文技术  
  
  用户prompt -> llm优化后的prompt,上下文，mcp skills -> transformer生成 -> loop engineering+ harness engineering -> fde（工程落地） 
  