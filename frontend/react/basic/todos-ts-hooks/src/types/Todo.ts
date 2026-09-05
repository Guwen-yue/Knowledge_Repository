// interface 申明不了简单数据类型

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}
// 类型别名
// 联合
export type FileterType = 'all' | 'completed' | 'uncompleted';
