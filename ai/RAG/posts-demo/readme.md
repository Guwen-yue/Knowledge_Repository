## RAG实战
Retrieval 检索
Answering 增强
Generation 生成
## 自然语义搜索
- data/posts.json 检索的范围  
- 问题：有什么vue相关的内容？ 
  正则或like？ 这是文字匹配？
  “马铃薯怎么做”  
  “酸辣土豆丝的做法...“
- question embedding 向量化 语义
- 内容都embedding
- rag 向量相似度计算
  
## juejin 的搜索
-  提前将内容embedding
需要向量数据库 milvus postgresql(mysql一样的关系数据库。但是支持向量储存)
