import { Controller, Get, Post, Body, Patch, Param, Delete ,DefaultValuePipe,Query} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ParseIntPipe } from '@nestjs/common';
import { SemanticSrearchDto } from './dto/semantic-search.dto';
// 不用实例化 直接注入到
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}
 
  @Get("/user/:userId")
  findByUser(@Param('userId',ParseIntPipe) userId: number){
    console.log(userId,typeof userId);
    return this.conversationsService.findConversationsByUserId(userId);
  }

  @Post(":id/search")
  search(
    @Param('id',ParseIntPipe) id:number,
    @Body() dto:SemanticSrearchDto,
    @Query("limit",new DefaultValuePipe(5),ParseIntPipe) queryLimit:number,
  ){
    const limit = dto.limit ?? queryLimit ?? 5;
    return this.conversationsService.searchSimilarMessages(id, dto.query, limit);
  }

  // @Post()
  // create(@Body() createConversationDto: CreateConversationDto) {
  //   return this.conversationsService.create(createConversationDto);
  // }

  @Get()
  findAll() {
    return this.conversationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConversationDto: UpdateConversationDto) {
    return this.conversationsService.update(+id, updateConversationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversationsService.remove(+id);
  }
}
