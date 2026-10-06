// ES CURD 
import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200'
})

const INDEX_NAME = 'travel_journal';

async function createDocument() {
  const now = new Date().toISOString();
  const res = await client.index({
    index: INDEX_NAME,
    document: {
      note_title: '杭州西湖半日游111',
      note_body: '早上绕湖慢跑，中午吃片儿川，下午在断桥拍照放松。',
      tags: ['旅行', '周末', '杭州'],
      mod: 'relaxed',
      priority: 2,
      created_at: now,
      updated_at: now
    }
  });
  console.log(`新增 成功 , ID =`, res._id);
  return res._id;
}

async function getDocument(docId) {
  const res = await client.get({
    index: INDEX_NAME,
    id: docId
  });
  console.log(res._source);
  return res._source;
}
async function updateDocument(docId){
  await client.update({
    index: INDEX_NAME,
    id: docId,
    doc: {
      note_title: '杭州西湖半日游1112222',
      note_body: '早上绕湖慢跑，中午吃片儿川，下午在断桥拍照放松。',
      tags: ['旅行', '周末', '杭州'],
      updated_at: new Date().toISOString()
    },
    refresh:true
  });
  console.log(`更新 成功 , ID =`, docId);
  return docId;
}
async function searchDocument(){
  const res = await client.search({
    index: INDEX_NAME,
    query: {
      match: {
        note_body: {
          query: '慢跑',
          analyzer:'ik_smart'
        }
      }
    }
  })
  console.log(res);
  const rows= res.hits.hits.map((item)=>({
    id: item_id,
    ...item._source
  }))
 }

async function main() {
  // const docId = await createDocument();
  const docId = 'ZHUzxKABQxnfx7bN0PTg';
  // console.log(docId);
  await getDocument(docId);
  // await updateDocument(docId);
}

main().catch(console.error);
