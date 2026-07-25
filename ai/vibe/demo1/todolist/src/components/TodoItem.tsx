import type { Task } from '../types'

interface Props {
  todo: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
        todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-green-500 accent-green-500"
      />
      <span
        className={`flex-1 text-base ${
          todo.completed
            ? 'text-gray-400 line-through'
            : 'text-gray-800'
        }`}
      >
        {todo.text}
      </span>
      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="cursor-pointer rounded px-2 py-1 text-sm text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
        title="删除"
      >
        🗑️
      </button>
    </div>
  )
}
