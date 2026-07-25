# Benchmark

benchmark是用标准题目给大模型打分的体系。

每次一个新的模型发布，宣传页都有一堆数字

- MMLU
- GPQA
- HumanEval

benchmark 是llm在一系列测试中的的分集合。
（多维，可测）。

## 基准测试
给一堆测试标准题目 ，让AI 模型去打分 ，是模型的高考，考完了会给出一个分数
- 为什么需要benchmark？
  大模型太多了，eg: GPT-4, GPT-4o, GPT-4o-mini, GPT-4o-mini-8k, GPT-4o-mini-8k-16k, 需要一个客观标准 ， benchmark就是这个标准.
  llm的能力是多维的，
  - MMLU 综合知识
  massive（巨大） Multitask Language Understanding 57个学科 领域选择题，从初中历史到大学医学，相当于文理综合卷。
  - GPQA  Diamond
  顶级推理能力
  Graduate-Level Google-Proof Q & A 
  专门去出研究生级别的物理化学生物难题。
  为什么叫 Google-Proof，因为这些题就算你上网搜也难找到答案。
  考的是模型是不是真正能推理，而不是去背答案。

- HumanEval 代码能力 SWE-bench
  两道试卷
  HumanEval 164道编程题，让大模型写出能够跑通的代码。
  SWE-bench 让模型直接去修真实的github项目的bug。

- MATH/AIME 数学推理
  竞赛级的数学题
  AIME是美国数学邀请赛的原题 ，考模型能不能一步步推到出正确答案，而不是凑结果。
  
- C-Eval 中文能力
专门针对中文语境，覆盖52个学科，4种难度。
训练语料 

- 厂商怎么用benchmark?
每次模型发布会拿出一堆的benchmark 来说自己特别强。
- openai 4.1 benchmark
- claude
厂商会挑表现好的哪几项去重点放大 。

模型在xx上说第一，不代表整体最强。

## benchmark 作用
是一个门槛，不是排名。
一个模型连benchmark都差 ，大概率能力也查。（门槛）
但分数搞，也不一定好用。
要看多个维度，不是单一分数。
要看具体业务， 以及使用的实际效果

## 总结
benchmark 是用标准题给大模型打分的体系，不同测试集考不同的能力
知识 推理 代码 数学 中文 厂商会选择展示对自己有利的数据 结合自身需求和体验判断。

代表一个这样的约定约定就是一个这样的一个