import {
  Entity,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToMany, // users
  ManyToOne,  // messages 
  PrimaryGeneratedColumn
} from 'typeorm'
import { User } from './user.entity'
import { Conversation } from './conversation.entity'

export enum MessageRole {
  USER = "user",
  ASSISTANT = "assistant",
  SYSTEM = "system",
}
@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number

  @Column({name: 'conversation_id'})
  conversationId: number
  
  @Column({type: 'text',enum: MessageRole})
  role: MessageRole;

  @Column({type: 'text'})
  content: string

  // pgvector 的 vector 类型，TypeORM 未纳入 ColumnType，用断言绕过编译检查
  @Column({ type: "vector" as any, length: 1024, nullable: true })
  embedding: number[] | null;

  @CreateDateColumn({type:"timestamptz",name:"created_at"})
  createdAt: Date;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages,{onDelete: 'CASCADE'})
  @JoinColumn({name: 'conversation_id'})
  conversation: Conversation

  
}