# Agentic RAG
ai agent 全栈开发岗
- 你用的什么向量数据库
milvus , ts
qdrant python 
pipecone ...


## RAG
公司内部的Agent 基本都要用到RAG 技术
llm能思考 但不知道公司内部的文档，我们需要基于内部文档来回答
这个流程太固定，有些缺点
- 所有的问题都走RAG 检索?  简单问题不需要检索 浪费资源
两个分支 一个简单问题 一个复杂问题
llm来判断简单？
- 没有纠错和评估机制，无法判断检索内容是否精确，是否足够。
  llm 评估函数
- 处理不了需要多部检索的复杂问题，比如先查A 再查B 才能得出结论
  天龙八部 中 四大恶人排行第二的是谁？ 此人之子再身世揭晓前，其生父再武林中的公开身份是什么？
  llm 规划能力 拆分 分步骤
- 专业术语，精确实体更适合关键词检索，纯语言检索容易匹配不准。
  mysql like 查询 正则 文字匹配 
  高血糖，低血糖 自然语义相似度 相近
- 本地知识库没有的内容，llm 就会胡说 ，要去网络所搜补充？
  llm 乱说

死板的检索生成 ， 流程，升级为可思考，可判断，可纠错的智能RAG 架构


### Agentic 
自主规划，更智能，评估 
langgraph  设计一个graph 表示Agentic  RAG 流程

## RAG graph
- 简单问题 任然会走retrieve，浪费token和时间，
  重新设计graph
## 继续优化现在RAG 的问题
- 处理不了需要多步检索的复杂问题，比如先查A，再查B，最后回答问题
  llm 规划 拆分 分步骤

## 网络搜索来兜底
本地知识库没有的内容，不会主动去网络搜索补充，容易编造答案

网络搜索结果，增强prompt
混合检索 = 向量数据库 + 网络所搜 + elasticsearch

## 倒排索引
ES 相比于Mysql 最大的核心优势，基于**倒排索引**底层机制
普通mysql是正向数据看，检索文本内容时，需要逐行遍历，逐字匹配内容
数据量越大， 文本越长 模糊/文本搜索就越慢 性能越差 不适合大范围关键词检索
es 使用倒排索引机制：
会自动对text 类型字段进行分词处理，才结尾一个个独立词条，再以词条为核心，反问
关联所有包含该词条的文档
倒排索引 关键词 -> 文档

用户输入关键词检索 ES只需要通过词条快速匹配相对应的文档 无需全表遍历 实现海量文本下毫秒级别全文检索

- 基于请求
  GET 查询/_cat/indicies
  输出所有的索引 table组织并显示
- 创建索引  PUT/article
  建表一样  mappings schema
  properties 各个字段
  title  content 分词 type : text 全文检索
  author 不分词  精确匹配
- 自动去分词建索引 将ID 放入列表

**全文检索** + **精确过滤**

``` es
GET /_cat/indices?v&h=health,status,index,docs.count

PUT /article
{
  "mappings": {
    "properties": {
      "title": {
        "type": "text"
      },
      "content": {
        "type": "text"
      },
      "author": {
        "type": "keyword"
      },
      "createTime": {
        "type": "date"
      },
      "viewCount": {
        "type": "integer"
      }
    }
  }
}

GET /article/_mapping



GET /article/_settings

DELETE /article

POST /article/_doc/1001
{
    "title":"RAG 混合检索",
    "content":"ES 混合检索更佳",
    "author":"AI开发",
    "createTime":"2025-09-14",
    "viewCount":120
}
```

- 检索API
  GET /article/_search  （传sort 可以按照参数排序）
  {
    "query": {
      "match": {
        "field": "你要检索的词"
      }
    }
  }

- DSL
  Mysql sql
  milvus embedding
  DSL  全称 domain specific language，邻域特定语言
  Elastic search http 查询
搜索
``` es
GET  /article/_doc/1001

POST /article/_doc/1002
{
  "title": "1002",
  "content": "ES 混合检索更佳",
  "author": "AI开发",
  "createTime": "2025-09-14",
  "viewCount": 120
}

GET /article/_search
{
    "query":{
        "match_all":{

        }
    }
}

GET /article/_search
{
    "query":{
        "match":{
            "content":"ES 混合 检索"
        }
    }
}

GET /article/_search
{
    "query":{
        "term":{
            "title":"1002"
        }
    }
}

GET /article/_search
{
    "query":{
        "multi_match":{
            "query":"检索",
            "fields":["title","content"]
        }
    }
}

GET /article/_search
{
    "_source":["title","author"],
    "query":{
        "match_all":{

        }
    }
}

GET /article/_search
{
    "from":0,
    "size":10,
    "sort":[{"viewCount":"desc"}],
    "query":{
        "match_all":{}
    }
}
```

更新
``` es
POST /article/_update/1001
{
    "doc":{
        "viewVount":66,
        "title":"胡文强局部更新"
    }
}
GET /article/_doc/1001

PUT /article/_doc/1001
{
    "title":"全量覆盖测试",
    "content":"原始内容被覆盖",
    "author":"测试用户",
    "createTime":"2026-09-16",
    "viewCount":"1111"
}
```


换了一个ik_smart 中文分词库
- ik_max_word+ ik_smart中文友好分词器的两种
  存的时候 ik_max_word ，尽量的多存索引，力度更细
  ik_smart 去的时候，粒度粗一些

- evaludate_local 
 条件边考虑 网络搜索死循环护栏
 if (state.webContext && String(state.webContext).trim()) {
    return "generate"
  }