// 手写 mini cursor 命令行
// 使用vite基于react创建todolist项目 ，编程agent 自动化
// 给我目录列表
//   编程Agent 自动化

import 'dotenv/config';
import { ChatOpenAI } from 'langchain/openai';
import{
  HumanMessage,
  AIMessage,
  SystemMessage,
  ToolMessage,
} from 'langchain/core/messages';
import { spawn } from 'node:child_process';
import {
    executeCommandTool,
    readFileTool,
    writeFileTool,
    listDirectoryTool
} from './all-tools.mjs';
