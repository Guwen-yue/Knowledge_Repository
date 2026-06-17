import { getCompletion } from './completion.mjs'

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 讲了函数简化规则

const main=async ()=>{
  // console.log('-------');
  // await sleep(2000);
  // console.log('-------');

  const prompt=`
  将一下中文翻译成西班牙语：
  \`\`\`
  你好，我想要一个搅拌机
  \`\`\`
  `
  const result = await getCompletion(prompt)
  console.log(result);

}
main()