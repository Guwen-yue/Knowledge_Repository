# 大模型是这么随机说话的？
控制大模型随机性的关键参数 
temperature 温度 随机性 0 - 1  文艺创作  | 代码创作
Top K  随机样本 得分排序

上一次词预测下一个词  prediction next word 
概率分布 1  -> 
“你好”  may 啊 吗0.6 呀0.1 美0.05  坏0.01.....

- 大概率是不是生成“吗”
 用temperature 0- 1 之间 
 0.2 低 严谨  吗
 0.8 高 随机  坏

- Top k ?  
  概率分布 按得分去排序，  

- 幻觉问题
- 开发者有效，靠谱的去使用，控制ai应用的随机性。

- 把temperature 拉高 随机性增加，生成会不太靠谱 
- 有一些创作类的 随机性 去增加创意，但想保证质量，
分两步做
- 先用 Top k 把高概率的词选出来
  3 | 2  默认值是8 
  AI应用效果观测
- 再用temperature 控制随机性
  0.2 代码  ,法律 公司合同
  0.8 创意创作 多模态模型 AI漫剧本
    Top k

- temperature 和Top k 不可能都太大的都很小也没必要。
  temperature 小，Top K大 ，准确 ，艺术性 
  temperature 大，Top K小 ，靠谱的创意性会燃烧 

## langchain
lang（uage） + chain(llm 工作链|流编排) 
### 核心模块 @langchain/core  
- messages 对话列表
- output_parsers 输出解析器
    这个自动的帮我解析出相应的格式
- tools 工具函数
- prompts 提示词模板

为什么需要langchain？
开发更快，业务类  
Ai Agent 应用 生成式，概率分布 优点黑盒
要不觉得干活不太智能 要不太智能，不知道他这么干出来，
chain 就是把Ai 工作 链条上的每个节点链起来。


## AI工作流
- llm 两个 创意和严谨的 适合不同的业务
- PromptTemplate
- StringOutputParser

start -> creativeModel -> outputParser
start -> preciseModel -> outputParser