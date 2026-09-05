import {
  useState
} from 'react';
import type {
   Todo, FileterType
} from '../types/Todo'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter] = useState<FileterType>('all');
  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false
    }
    // 传一个函数， 拿到之前的状态
    setTodos(prev => [...prev, newTodo])
  }
  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(item => 
        item.id === id ? {
          ...item,
          completed: !item.completed
        }: item
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos(prev => 
      prev.filter(item => item.id !== id)
    )
  }
  const clearCompleted = () => {
    setTodos(prev => prev.filter(item => !item.completed))
  }
  // const filteredTodos = () => {

  // }

  return {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted
  }
}