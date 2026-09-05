import  {
  Injectable,  // 可以被自动注入
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
let todos: Todo[] = [{
  id: 1,
  title: '学习nestjs',
  completed: false,
},
{
  id: 2,
  title: '学习nestjs 2',
  completed: false,
},
];

@Injectable()
export class TodosService {


  findAll(): Todo[] {
    return todos;
  }
  // 后端业务严谨稳定 容错模块
  findOne(id: number): Todo {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    return todo;
  }
  create(title: string) : Todo {
    return {
      id: todos.length + 1,
      title,
      completed: false,
    }
  }
  remove(id: number) : void {
    const index = todos.findIndex(t=>t.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo ${id} not found`);
    }
    todos.splice(index, 1);
  }

  update(id: number,patch: Partial<Todo>) {
    const todo = this.findOne(id);
    Object.assign(todo, patch);
    return todo;
  }
}

