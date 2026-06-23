# token 

## 分词 Tokenization
- llm 计价 和工作的最小单位
一个英文字符 大约 0.3 个token
一个中文字符 大约 0.6 个token
百万token 几人名币
- 为什么必须分词?
输入的是Prompt 文本
根据上一个词,预测下一个词
词之间的语义相关性 计算
数学?
神经网络只能处理数字(向量,矩阵),看不懂中文,英文等字符(主要是由计算机的底层运行机制和模型训练的效率决定)
必须把文字转换为一串数字离散符号ID ,token.


- js-tiktoken
  文本编码为token
  解码token为文本
  输入的tokens + 输出的tokens = 总token数

## Embedding 
大模型不能直接处理文本,先tokenizer,再embedding
文本 切割为token (大的文本理解任务切割为小的文本理解任务,llm的处理性能)
不能切成字符,没意义
token 可以相成一个单词,但也不完全是单词,cl100k_base来提供
文本 - > cl100k_base 映射规则(不一定是word,而一定是token)
token ID 215 100k

理解语义,神经网络计算,相似度
embedding 文本嵌入(向量化) llm embeddng 接口
1024 -1->1