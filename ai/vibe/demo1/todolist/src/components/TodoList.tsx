import type { Task } from '../types'
import TodoItem from './TodoItem'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'

interface Props {
  todos: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onReorder: (startIndex: number, endIndex: number) => void
}

export default function TodoList({ todos, onToggle, onDelete, onReorder }: Props) {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return
    if (result.source.index === result.destination.index) return
    onReorder(result.source.index, result.destination.index)
  }

  if (todos.length === 0) {
    return (
      <p className="mt-12 text-center text-gray-400">
        暂无待办，添加一条吧 📝
      </p>
    )
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-3"
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TodoItem
                      todo={todo}
                      onToggle={onToggle}
                      onDelete={onDelete}
                    />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
