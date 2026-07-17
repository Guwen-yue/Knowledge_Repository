// 实例化mcp server 
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
// 本地通信
import { StdioServerTransport } from 
  '@modelcontextprotocol/sdk/server/stdio.js';
import { 
  ListToolsRequestSchema,
  CallToolRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';

const server = new Server(
  { name: 'simple-read-mcp', version: '1.0.0' },
  { capabilities: { tools: {} } }
)
// 处理agent  请求  事件
// ListToolsRequestSchema mcp 事件之一  列出所有工具
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'read_file',
      description: '读取指定路径的本地文件内容',
      inputSchema: {
        type: 'object',
        properties: {
          path: {
            type: 'string',
            description: '文件的绝对或相对路径'
          },
          required: ['path']
        }
      }
    }
  ]
}));
// 调用工具
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // 结构出来同时，命名为args
  const { name, arguments: args } = request.params;
  if (name === 'read_file') {
    try {
      const content =await fs.readFile(args.path, 'utf-8');
      // 上下文就有了
      return { result: {
        content:[
          {
            type: 'text',
            text: content
          }
        ]
      } };
    } catch (error) {
      return { 
        isError: true,
        content:[
          {
            type: 'text',
            text: `读取文件${args.path}失败：${error.message}`
          }
        ]
       };
    }
  }
})

async function main() {
  // 连接本地transport 打通连接隧道
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main();