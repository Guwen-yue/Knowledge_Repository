import { Controller, Get, Post, Body, Delete, Put } from '@nestjs/common';
import { Param } from '@nestjs/common';
import { TodosService,type Todo } from './Todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  findAll(): Todo[] {
    console.log('/todos controller ');
    return this.todosService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number): Todo {
    return this.todosService.findOne(Number(id));
  }

  @Post()
  create(@Body() title: string) : Todo {
    return this.todosService.create(title);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(Number(id));
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() title: string) {
    return this.todosService.update(Number(id), title);
  }
}

 