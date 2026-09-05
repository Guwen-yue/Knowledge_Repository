# nestjs

next.js全栈   nest.js  就是node 的纯后端企业级开发框架。
默认使用typescript ， 全面模块化思想，适合 构建企业级服务

## 后端开发做些什么？
- 提供api接口 web 开发
- 系统集成，并发底层服务  AI Infra
- 微服务
## 安装
npm i -g @nestjs/cli
nest new hello
nest run start
## 目录架构
-src
   main.ts 入口文件
   app.model.ts 根模块
## 工厂模式
## 高度模块化
   约定
   App -> Model
       ->@nestjs/common Model 类
       -> import 依赖项
       -> controller 控制器 参数校验，简单逻辑 最后 return response
       -> service 服务 return 数据

## 装饰器模式 
装饰器模式在不修改原有对象的基础上，动态给对象叠加额外功能
@
class

## 开发流程
Application import 里面植入我们的module
Module是 nestjs 的独立业务模块
  module是组装 
- NotFoundException
  nestjs 内置的错误类
  请说下你是如何处理后端报错的？
  try catch finally ts 独苗，会挂线程
