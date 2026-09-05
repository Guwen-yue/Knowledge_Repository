// nestjs 按需加载  大型框架性能优化、模块化思考
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // 实例化一个 后端nestjs 应用
  //面向对象思想
  //工程模式
  //nest 可以开发的后端服务太多了
  //  /首页  由AppModel 来服务
  // Model 是一个整体  后端最常见的MVC 模式
  // 一个文件 几千行代码
  // localhost:3000/   /后端路由 -> AppModel -》
  // 组织控制器  AppController -》 service 层 CRUD sql
  const app = await NestFactory.create(AppModule);
  // 启动web http 服务3000 端口
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
