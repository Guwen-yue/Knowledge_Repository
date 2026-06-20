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
const user_messages = [
    "La performance du système est plus lente que d'habitude.",  // System performance is slower than normal         
    "Mi monitor tiene píxeles que no se iluminan.",              // My monitor has pixels that are not lighting
    "Il mio mouse non funziona",                                 // My mouse is not working
    "Mój klawisz Ctrl jest zepsuty",                             // My keyboard has a broken control key
    "我的屏幕在闪烁"                                             // My screen is flashing
    ];