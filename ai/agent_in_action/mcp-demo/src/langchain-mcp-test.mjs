import 'dotenv/config';
// agent 配置 mcp client ? 可以配置多个mcp server的client
import { MultiServerMCPClient } from '@langchain/mcp-adapters';
import { ChatOpenAI } from '@langchain/openai';
import chalk from 'chalk';
import { 
  HumanMessage, 
  SystemMessage, 
  ToolMessage 
} from '@langchain/core/messages';

const model = new ChatOpenAI({
  modelName:'deepseek-v4-pro',
  apiKey: process.env.DEEPSEEK_API_KEY,
  temperature: 0,
  configuration: {
    baseURL: 'https://api.deepseek.com/v1',
  },
});

const mcpClient = new MultiServerMCPClient({
  mcpServers: {
    'my-mcp-server': {
      command: 'node',
      args: ['C:/Users/26066/Desktop/workspace/hwq_ai/ai/agent_in_action/mcp-demo/src/my-mcp-server.mjs']
    }
  }
})

// 获取工具
const tools = await mcpClient.getTools();
const res = await mcpClient.listResources();
let resourceContent = '';
for (const [serverName, resources] of Object.entries(res)) {
  for (const resource of resources) {
    const content = await mcpClient.readResource(
      serverName, resource.uri
    )
    resourceContent += content[0].text;
  }
}
console.log(resourceContent, '---------------');
const modelWithTools = model.bindTools(tools);


async function runAgentWithTools(query,maxIterations=30){
  const messages =[
    new SystemMessage(resourceContent),
    new HumanMessage(query)
  ];
  for(let i=0;i<maxIterations;i++){
    console.log(chalk.bgGreen(`正在思考，第${i+1}轮`));
    const response = await modelWithTools.invoke(messages);
    messages.push(response);

    if (!response.tool_calls || response.tool_calls.length === 0) {
      console.log(`\n AI 最终回复： \n ${response.content}`);
      return response.content;
    }
    console.log(chalk.bgBlue.bgBlue(`检测到 ${response.tool_calls.length}个工具调用`));
    console.log(chalk.bgBlue(`工具调用: ${response.tool_calls.map(t => t.name).join(', ')}`))

    for(const toolCall of response.tool_calls){
      // find方法  返回匹配的哪一项 ，如果找到了，后面不会执行
      // promise.all  只要以失败了，就不会等剩下的结果了，但是已经发起的异步任务会继续执行
      const foundTool=tools.find(t =>
        t.name===toolCall.name);
      if(foundTool){
        const toolResult = await foundTool.invoke(toolCall.args);
        // 返回的是纯文本，tool的返回是有上下文的相关性
        // 一定要带上tool_call_id
        messages.push(new ToolMessage({
          content:toolResult,
          tool_call_id : toolCall.id
        }))
      } else {
        console.log(chalk.bgRed(`未找到工具: ${toolCall.name}`));
        messages.push(new ToolMessage({
          content: `未找到工具: ${toolCall.name}`,
          tool_call_id : toolCall.id
        }));
      }
    }

    
  }
  // 循环次数达到30下 任无法会反复问题，返回最后一轮
  return messages[messages.length-1].content;
}

await runAgentWithTools('查一下用户001的信息')
// 关闭所有mcp子进程 ，释放进程资源  
// 关闭和mcp server的通信通道  
// my-mcp-server.mjs 被启动了,手动关闭进程
// 释放相关资源,避免脚本一致挂着不退出
// node langchain--mcp-test.mjs  会启动进程 
// 启动一个子进程 child-process 子进程链接my-mcp-Server.mjs
// 主进程通过stdio和他们通话
// close()那这个链接和子进程一起关掉

await mcpClient.close();