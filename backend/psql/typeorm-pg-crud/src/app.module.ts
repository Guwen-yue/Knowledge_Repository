import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConversationsModule } from './conversations/conversations.module';
import { User } from './conversations/entities/user.entity';
import { Conversation } from './conversations/entities/conversation.entity';
import { Message } from './conversations/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "user",
        password: "123456",
        database: "hello_pg",
        // 会自动根据实体类同步数据库表结构，实体改了就自动改数据库表
        synchronize: true,
        // 开启 TypeORM 日志，会把执行的每一条 SQL 语句打印到控制台，方便调试查看实际跑的 SQL，生产环境建议关掉。
        logging: true,
        // entities 用来放**实体类** 注册一下
        entities: [User, Conversation, Message] // 每个表的类都是一个实体
      }),
      // 自定义 DataSource 工厂：注册 pgvector 的 vector 类型（TypeORM 原生不认识）
      dataSourceFactory: async (options) => {
        const dataSource = new DataSource(options as any);
        const driver = dataSource.driver as any;
        // 注册为支持的数据类型；vector(1024) 带长度，还要加入 withLengthColumnTypes
        driver.supportedDataTypes.push("vector");
        driver.withLengthColumnTypes.push("vector");
        return dataSource.initialize();
      }
    }),
    ConversationsModule
  ],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}

