import TodoStart from '../components/TodoStart';
import TodoList from '../components/TodoList';
import TodoInput from '../components/TodoInput';
import { useState } from 'react';
import './App.css';

const App = () => {

 const [todos,setTodos] = useState([
  {
    id:1,text:"吃饭",completed:false
  },
  {
    id:2,text:"睡觉",completed:false
  },
  {
    id:3,text:"打豆豆",completed:true
  }
 ]);

//  添加todo 的方法 父组件管理
  const addTodo =(text)=>{
    if(text.trim() === "") return 
    // 全新的状态 
    setTodos([...todos,{id: +Date.now(),text,completed:false}])
  }
  const toggleTodo =(id) =>{
    // 全新的状态 
    setTodos(todos.map(todo=>{
      if(todo.id === id){
        return {...todo,completed:!todo.completed}
      }
      return todo
    }))
  }
  const deleteTodo =(id) =>{
    setTodos(todos.filter(todo=>todo.id !== id))
  }

  const clearCompleted = () =>{
    setTodos(todos.filter(todo=>!todo.completed))
  }
  return (
    <div>
      <h1>My Todo List</h1>
      {/* 自定义事件，  */}
      <TodoInput onAdd={addTodo}/>
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo}  />
      <TodoStart total={todos.length} active={todos.filter(todo=>!todo.completed).length} completedCount={todos.length-todos.filter(todo=>!todo.completed).length} clearCompleted={clearCompleted} />
    </div>
  )
}

export default App