import 'dotenv/config'
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
    'amap-maps-streamableHTTP': {
      url: 'https://mcp.amap.com/mcp?key=e5b25018293e4931944d725081c37e96',
    },
    'filesystem': {
        command: 'npx',
        args: [
            '-y',
            '@modelcontextprotocol/server-filesystem',
            // 允许访问的文件夹，可以配置多个，用空格隔开
            'C:/Users/26066/Desktop/workspace/hwq_ai/ai/agent_in_action/remote-mcp'
        ]
    },
    'chrome-devtools': {
        command: 'npx',
        args: [
            '-y',
            'chrome-devtools-mcp@latest',
        ]
    }
  }
})

const tools = await mcpClient.getTools();
// console.log(tools);
const modelWithTools = model.bindTools(tools);

async function runAgentWithTools(query, maxIterations = 30) {
    const messages = [
        new HumanMessage(query)
    ];

    for(let i = 0; i < maxIterations; i++){
        console.log(chalk.bgGreen(`第${i+1}轮迭代 `));
        const response = await modelWithTools.invoke(messages);
        messages.push(response);
        if(!response.tool_calls || response.tool_calls.length === 0){
            console.log(chalk.bgRed(`AI 回答： ${response.content}`));
            return response.content;
        }

        console.log(chalk.bgBlue(`工具调用： ${response.tool_calls.map(t => t.name).join(', ')}`));

        for (const toolCall of response.tool_calls) {
                    const foundTool = tools.find(t => t.name === toolCall.name);
                    if (foundTool) {
                        const toolResult = await foundTool.invoke(toolCall.args);
                        let contentStr;
                        // mcp tool 返回一般字符串
                        // 还有可能 处理对象
                        if (typeof toolResult === 'string') {
                            contentStr = toolResult;
                            // str
                            // fileSystem   {text:}
                        } else if (toolResult && toolResult.text) {
                            contentStr = toolResult.text;
                        }
                        messages.push(new ToolMessage({
                            content: contentStr,
                            tool_call_id: toolCall.id
                        }));
                    }
                }
    }
    // 最后一个消息是AI的回复
    // 改进
    return messages[messages.length - 1].content;
}

await runAgentWithTools(`北京南站附近的3个酒店，以及去的路线，
    路线规划生成文档保存到 当前目录 的一个 md 文件`)
await mcpClient.close();
