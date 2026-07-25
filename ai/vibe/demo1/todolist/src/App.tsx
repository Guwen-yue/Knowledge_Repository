import { useState, useCallback } from 'react'
import type { Task } from './types'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'

export default function App() {
  const [todos, setTodos] = useState<Task[]>([])

  const addTodo = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    }
    setTodos((prev) => [...prev, newTask])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  /** 拖拽排序：将 startIndex 项移动到 endIndex */
  const reorderTodo = useCallback((startIndex: number, endIndex: number) => {
    setTodos((prev) => {
      const next = Array.from(prev)
      const [removed] = next.splice(startIndex, 1)
      next.splice(endIndex, 0, removed)
      return next
    })
  }, [])

  return (
    <div className="mx-auto mt-16 max-w-lg px-4">
      <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
        待办清单
      </h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onReorder={reorderTodo}
      />
    </div>
  )
}
