import { useState, useEffect, useCallback, useMemo } from 'react'
import './App.css'

interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: number
}

type FilterType = 'all' | 'active' | 'completed'

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return []
      }
    }
    return []
  })
  const [inputValue, setInputValue] = useState('')
  const [filter, setFilter] = useState<FilterType>('all')
  const [animatingIds, setAnimatingIds] = useState<Set<number>>(new Set())
  const [removingIds, setRemovingIds] = useState<Set<number>>(new Set())

  // 持久化
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  // 添加待办
  const addTodo = useCallback(() => {
    const text = inputValue.trim()
    if (!text) return
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: Date.now(),
    }
    setTodos(prev => [newTodo, ...prev])
    setInputValue('')
    // 入场动画标记
    setAnimatingIds(prev => new Set(prev).add(newTodo.id))
    setTimeout(() => {
      setAnimatingIds(prev => {
        const next = new Set(prev)
        next.delete(newTodo.id)
        return next
      })
    }, 50)
  }, [inputValue])

  // 删除待办
  const deleteTodo = useCallback((id: number) => {
    setRemovingIds(prev => new Set(prev).add(id))
    setTimeout(() => {
      setTodos(prev => prev.filter(t => t.id !== id))
      setRemovingIds(prev => {
        const next = new Set(prev)
        next.delete(id)
        return next
      })
    }, 350)
  }, [])

  // 切换完成状态
  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }, [])

  // 清空已完成
  const clearCompleted = useCallback(() => {
    const completedIds = todos.filter(t => t.completed).map(t => t.id)
    completedIds.forEach(id => {
      setRemovingIds(prev => new Set(prev).add(id))
    })
    setTimeout(() => {
      setTodos(prev => prev.filter(t => !t.completed))
      setRemovingIds(new Set())
    }, 350)
  }, [todos])

  // 筛选后的列表
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed)
      case 'completed':
        return todos.filter(t => t.completed)
      default:
        return todos
    }
  }, [todos, filter])

  // 统计
  const stats = useMemo(() => {
    return {
      total: todos.length,
      active: todos.filter(t => !t.completed).length,
      completed: todos.filter(t => t.completed).length,
    }
  }, [todos])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo()
  }

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'active', label: '进行中' },
    { value: 'completed', label: '已完成' },
  ]

  return (
    <div className="app">
      <div className="container">
        {/* 头部 */}
        <header className="header">
          <h1 className="title">
            <span className="title-icon">📝</span>
            TodoList
          </h1>
          <p className="subtitle">专注你的每一天</p>
        </header>

        {/* 输入区域 */}
        <div className="input-wrapper">
          <input
            type="text"
            className="todo-input"
            placeholder="添加新的任务..."
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="add-btn" onClick={addTodo}>
            <span className="add-icon">+</span>
          </button>
        </div>

        {/* 筛选 + 统计 */}
        <div className="toolbar">
          <div className="filters">
            {filterOptions.map(opt => (
              <button
                key={opt.value}
                className={`filter-btn ${filter === opt.value ? 'active' : ''}`}
                onClick={() => setFilter(opt.value)}
              >
                {opt.label}
                <span className="badge">
                  {opt.value === 'all'
                    ? stats.total
                    : opt.value === 'active'
                      ? stats.active
                      : stats.completed}
                </span>
              </button>
            ))}
          </div>
          {stats.completed > 0 && (
            <button className="clear-btn" onClick={clearCompleted}>
              清空已完成
            </button>
          )}
        </div>

        {/* 列表 */}
        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">
              <span className="empty-icon">
                {filter === 'completed' ? '🎉' : filter === 'active' ? '✨' : '📋'}
              </span>
              <p>
                {filter === 'completed'
                  ? '还没有已完成的任务'
                  : filter === 'active'
                    ? '所有任务都已完成！'
                    : '暂无任务，添加一个吧'}
              </p>
            </li>
          ) : (
            filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={`todo-item ${animatingIds.has(todo.id) ? 'slide-in' : ''} ${
                  removingIds.has(todo.id) ? 'slide-out' : ''
                } ${todo.completed ? 'completed' : ''}`}
              >
                <button
                  className={`check-btn ${todo.completed ? 'checked' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                  aria-label={todo.completed ? '取消完成' : '标记完成'}
                >
                  {todo.completed && (
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <polyline
                        points="20 6 9 17 4 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                <span className={`todo-text ${todo.completed ? 'done' : ''}`}>
                  {todo.text}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => deleteTodo(todo.id)}
                  aria-label="删除"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <line
                      x1="18" y1="6" x2="6" y2="18"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <line
                      x1="6" y1="6" x2="18" y2="18"
                      stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </li>
            ))
          )}
        </ul>

        {/* 底部统计 */}
        <footer className="footer">
          <span>{stats.active} 项待完成</span>
          {stats.total > 0 && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%`,
                }}
              />
            </div>
          )}
        </footer>
      </div>
    </div>
  )
}

export default App
