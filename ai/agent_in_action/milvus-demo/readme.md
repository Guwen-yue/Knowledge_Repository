# 向量数据库
- loader and spiltter
- 内存向量数据库

## Milvus
文档向量化放到向量数据库，每次查询根据向量化的query 去数据库做相似度匹配度，查出相关文档放到prompt里面

- 从内存到向量数据库
milvus 是一款开源的向量数据库 转为处理海量高维向量数据而设计。 ai agent 产品都会使用milvus 这样的vector store
像wen应用会把数据存在mysql 里面 ，sqlite ，psql ，基于对数据的增删改查实现各种业务功能。CRUD

根据id 或者关键词（like）去关联查询一系列表的数据
Agent 会把知识， 记忆   放在Milvus 数据库中，对知识， 记忆语义检索，增删改查等 各种功能。

## Ai 日记本 diary
- 日记的增删改查 CRUD MYSQL 非ai 功能
- 最近心情比较好的日记
   同时，将entity 向量化存储到milvus中 ai 功能


## zilliz 
基于milvus的全托管向量数据库服务



