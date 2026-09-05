import 'dotenv/config'
import {
  MilvusClient, // c|s  B|C 架构
  IndexType,
  MetricType , // 相似度求方法
  DataType, // 字段数据类型约束
} from '@zilliz/milvus2-sdk-node'
import {
  OpenAIEmbeddings,
} from '@langchain/openai'

const ADDRESS =process.env.MILVUS_ADDRESS
const TOKEN=process.env.MILVUS_TOKEN
const COLLECTION_NAME = 'ebook2';
const VECTOR_DIM=1024; 

const embedding = new OpenAIEmbeddings({
 apiKey: process.env.OPENAI_API_KEY,
 model: process.env.EMBEDDINGS_MODEL_NAME,
 configuration: {
  baseURL: process.env.OPENAI_BASE_URL,
 },
 dimension: VECTOR_DIM,
})
const client =new MilvusClient({
    address :ADDRESS ,
    token : TOKEN
})
const getEmbedding = async (text) => {
  const result = await embedding.embedQuery(text);
  return result;
}


async function main(){
    try{
      console.log('Connecting to Milvus...')
      await client.connectPromise;
      console.log("connected successfully")
      const query = "段誉会什么武功"
      const queryVector=await getEmbedding(query);
      const searchResult= await client.search({
        collection_name: COLLECTION_NAME,
        vectors: [queryVector],
        limit: 3,
        metric_type: MetricType.COSINE,
        output_fields: ['id', 'book_id', 'chapter_num', 'index', 'content'],
      })
      searchResult.results.forEach((item,index)=>{
        console.log(`\n第${index+1}[Score: ${item.score.toFixed(4)}],ID:${item.id},
        BookID:${item.book_id},
        ChapterNum:${item.chapter_num},
        Index:${item.index},
        Content:${item.content}\n`
        )
      })



    }catch(err){
      console.error(err)
    }
}

main().catch(console.error)
