import { Injectable,
  NotFoundException,
 } from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
// Entity  代表就是一个这样一个这个样一个
import { EntityManager } from 'typeorm';
// 依赖注入
import { InjectEntityManager } from '@nestjs/typeorm';
import { Conversation } from './entities/conversation.entity';
import {User} from './entities/user.entity';


@Injectable()
export class ConversationsService {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,) {}

  async findConversationsByUserId(userID: number){
    const user = await this.em.findOne(User, {
      where:{
        id: userID,
      },
      relations: {conversations: true},
      order:{conversations:{createdAt: 'DESC'}},
    });

    if(!user){
      throw new NotFoundException(`User ${userID} not found`);
    }

    return user.conversations ?? [];
  }
  
  async searchSimilarMessages(
    conversationId: number,
    query: string,
    limit: number,
  ){
    return {
      messages:[]
    }
  }

  create(createConversationDto: CreateConversationDto) {
    return 'This action adds a new conversation';
  }

  async findConversationDto(userID: number){

  }

  findAll() {
    return `This action returns all conversations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}

