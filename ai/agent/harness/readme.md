# Harness Engineering

- Ai 数年历史
Prompt engineering -> Context Engineering -> Harness Engineering 前两个还是prompt 
RAG Retrival 先检索  Augument(增强)  Gerneration 生成 
检索增强生成 

harness engineering
25年下半年 claude code 接棒 cursor 在ai coding邻域
小龙虾 openclaw ，hermes 办公领域
tecent 在codebuddy coding workbuddy 办公自动化
微信 + workbuddy 

想象你有一匹马，那匹马很有力量，真正能让吗mak work 的 ，需要啥？ harnesss 给马套上挽具，缰绳，马鞍，这些统称为harness 

当下llm很智能，但是不能代表给出一个好的输出
harness 是个比喻 ，对应着让llm好用的一些技术工程架构
harnenss主要研究怎么在模型外面套上一层好的挽具。
让模型的能力可以稳定的重复的去驾驭。
harness不再是简单的把prompt给他提升，比prompt打一个量级

在了解harness之前，先要了解LLM 又哪些**结构性**的缺陷
- stateless 无状态
    每次对话结束，他什么都不记得
- 无法主动操作外部世界 ，只能生成文本，图片
    复杂项目 不知有读写 浏览器 等常规工具 ，mcp skill 一堆
    管理起来
- 他的输出时概率性的
    同样的输入，可能产出不同的输出
    文无第一（文章生成），武无第二（coding 赛道）
- 又上下文限制，不能无线去处理信息
    deepseek-v4-flash 为例1M的超长上下文处理能力

以上四个时llm的自身特质。

harness要做的，就是在这些基本的性质上，建造一套系统（工程化手段），让模型可以完成原本无法独立完成的任务。

模型时引擎，harness就是接着v8引擎的车。引擎再牛，没有好的变速箱，没有刹车，没有仪表盘，这个车没法上路

## harness 包含几部分？

harness engineering 不是具体工程或框架，而是围绕这个模型，去构造的几类基础设施的总称

核心又四层
- 记忆层
解决模型无状态的问题，模型本上就不记得上一次对话说什么，也不知道你的项目有什么规范
vibe coding 氛围编程 不断的去自然语言编程？ 
Claude.md  / agents.md 文件 系统带来记忆系统的存储。
他是首先要掌握的harness 记忆模块的一个核心，时导航地图，告诉agent最关键的约束和这个规则，每次带上。

## 案例驱动
不要急于生成代码
/init 初始化项目的记忆 ，非常重要。项目核心约束，包含项目功能，技术栈，开发规范，文件或目录结构等。
全新的项目，新建claude.md文件记忆
每当claude.md改变后，再次执行/init 就会更新记忆
harness engineering 中memory很重要